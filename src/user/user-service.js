const userRepository = require('./user-repository');
const AppError = require('../errors/AppError');
const commonErrors = require('../errors/commonErrors');
const imageRepository = require('../image/image-repository.js');
const config = require('../config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const axios = require('axios');

const JWT_SECRET = config.JWT_SECRET;

const KAKAO_ID = config.clientID;
const KAKAO_URL = config.callbackURL;

class UserService {
  // 카카오로부터 사용자 정보를 가져오고 토큰을 생성하는 함수
  async handleKakaoLogin(code) {
    try {
      // 카카오로부터 사용자 정보를 가져옴
      const kakaoUserInfo = await this.requestUserInfoFromKakao(code);

      // 카카오 사용자 정보를 기반으로 토큰을 생성
      const token = await this.generateTokenFromKakaoUserInfo(kakaoUserInfo);
      return token;
    } catch (error) {
      console.error('Error processing Kakao login:', error);
      throw new Error('Internal Server Error');
    }
  }

  // 카카오로부터 사용자 정보를 가져오는 함수
  async requestUserInfoFromKakao(code) {
    try {
      // URLSearchParams를 사용하여 요청 본문 데이터를 인코딩
      const params = new URLSearchParams();
      params.append('grant_type', 'authorization_code');
      params.append('client_id', KAKAO_ID); // 카카오 앱의 클라이언트 ID
      params.append('redirect_uri', KAKAO_URL);
      params.append('code', code);

      const response = await axios.post(
        'https://kauth.kakao.com/oauth/token',
        params.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded', // 요청 헤더에 콘텐츠 타입 명시
          },
        },
      );
      const accessToken = response.data.access_token;

      const userInfoResponse = await axios.get(
        'https://kapi.kakao.com/v2/user/me',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return userInfoResponse.data;
    } catch (error) {
      console.error(`Error: ${error.message}`);
      if (error.response) {
        // axios 에러 응답이 있는 경우, 상세 정보 로깅
        console.error(`Response Status: ${error.response.status}`);
        console.error(`Response Data: ${JSON.stringify(error.response.data)}`);
      }
      throw new Error('카카오 사용자 정보를 가져오는 중 에러 발생');
    }
  }

  // 카카오 사용자 정보를 기반으로 토큰을 생성하는 함수
  async generateTokenFromKakaoUserInfo(kakaoUserInfo) {
    try {
      const exUser = await userRepository.findUserOne({
        email: kakaoUserInfo.kakao_account.email,
      });
      // 기존 사용자일 경우
      if (exUser) {
        const token = jwt.sign(
          {
            userId: exUser._id,
            email: exUser.email,
            isAdmin: exUser.is_admin,
          },
          JWT_SECRET,
          {
            expiresIn: '6h',
          },
        );
        return token;
      }
      // 새로운 사용자일 경우
      const newUser = await userRepository.createUserForKakao({
        email: kakaoUserInfo.kakao_account.email,
      });

      const token = jwt.sign(
        {
          userId: newUser._id,
          email: newUser.email,
          isAdmin: newUser.is_admin,
        },
        JWT_SECRET,
        {
          expiresIn: '6h',
        },
      );
      console.log('Generated token:', token);
      return token;
    } catch (error) {
      console.error('Error generating token from Kakao user info:', error);
      throw new Error('토큰 생성 중 에러 발생');
    }
  }

  // 회원 가입
  async signUp({ email, plainPassword }) {
    //이메일로 기존 유저 여부
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser !== null) {
      throw new AppError(
        commonErrors.inputError,
        '중복 된 이메일 입니다.',
        400,
      );
    }
    const hashedPassword = await bcrypt.hash(plainPassword, 8);
    const newUser = await userRepository.createUser({
      email,
      password: hashedPassword,
    });

    return { message: '회원가입이 성공적으로 완료되었습니다.', newUser };
  }

  //로그인
  async signIn({ email, plainPassword }) {
    const user = await userRepository.findByEmail(email);
    if (user === null) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '이메일 또는 비밀번호를 다시 확인해주세요',
        400,
      );
    }
    const isPasswordValid = await bcrypt.compare(plainPassword, user.password);
    if (!isPasswordValid) {
      throw new AppError(
        commonErrors.inputError,
        '이메일 또는 비밀번호를 다시 확인해주세요',
        400,
      );
    }
    const tokenPayload = {
      userId: user._id,
      email: user.email,
      isAdmin: user.is_admin,
    };

    const encodedToken = await new Promise((resolve, reject) => {
      jwt.sign(
        tokenPayload,
        JWT_SECRET,
        { expiresIn: '6h' },
        (error, encoded) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(encoded);
        },
      );
    });
    return encodedToken;
  }
  // 카카오 로그아웃 API 호출 함수
async kakaoLogout(accessToken) {
  try {
      const response = await axios.post('https://kapi.kakao.com/v1/user/logout', null, {
          headers: {
              Authorization: `Bearer ${accessToken}`
          }
      });
      console.log('카카오 로그아웃 성공:', response.data);
  } catch (error) {
      console.error('카카오 로그아웃 실패:', error.response.data);
  }
}

  // 회원정보수정
  async updateUserInfo(email, { nickname, tag }) {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '해당 회원이 존재하지 않습니다',
        404,
      );
    }
    const tagImg = await imageRepository.getImageByName(tag);
    const updatedUserInfo = await userRepository.updateByEmail(email, {
      nickname,
      tag,
      tagImg,
    });

    return {
      message: '회원정보수정이 성공적으로 완료되었습니다.',
      updatedUserInfo,
    };
  }

  // 회원정보조회(password, isAdmin 없음)
  async getUserInfo(email) {
    const userInfo = await userRepository.findByEmail(email);
    const { password, is_admin, ...userInfoWithoutSensitive } = userInfo;
    return userInfoWithoutSensitive;
  }

  /// 회원 탈퇴
  async patchUserInfo(email) {
    const patchedUser = await userRepository.patchByEmail(email);

    if (!patchedUser) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '해당 회원이 존재하지 않습니다',
        404,
      );
    }

    return { message: '회원정보가 성공적으로 삭제되었습니다.', patchedUser };
  }

  // 리뷰 작성자의 신고 카운트 증가
  async incrementComplaintByReviewId(reviewId) {
    const userId = await userRepository.getUserIdByReviewId(reviewId);
    const patchedUserComplaint =
      await userRepository.incrementComplaintById(userId);
    if (!patchedUserComplaint) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '해당 회원이 존재하지 않습니다',
        404,
      );
    }
    return {
      message: '리뷰 신고가 성공적으로 완료되었습니다.',
      patchedUserComplaint,
    };
  }

  // 관리자 모든 회원 정보 조회

  async getUsers() {
    const users = await userRepository.allUsers();
    if (!users.length === 0) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '회원목록이 존재하지 않습니다.',
        404,
      );
    }
    return users;
  }

  // 관리자 회원 정보 삭제
  async deleteUser(id) {
    const deletedUser = await userRepository.deleteById(id);

    if (deletedUser === null) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '해당 회원이 존재하지 않습니다',
        404,
      );
    }

    return { message: '회원정보가 성공적으로 삭제되었습니다.', deletedUser };
  }
}
module.exports = new UserService();
