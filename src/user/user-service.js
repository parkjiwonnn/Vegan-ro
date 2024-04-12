const userRepository = require('./user-repository');
const AppError = require('../errors/AppError');
const commonErrors = require('../errors/commonErrors');
const imageRepository = require('../image/image-repository.js');
const config = require('../config');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const JWT_SECRET = config.JWT_SECRET;

class UserService {
// 회원 가입
async signUp({ email,plainPassword }) {
  //이메일로 기존 유저 여부
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser !== null) {
    throw new AppError(commonErrors.inputError, "중복 된 이메일 입니다.", 400);
  }
  const hashedPassword = await bcrypt.hash(plainPassword, 8);
  const newUser = await userRepository.createUser({email,password: hashedPassword});

  return { message: "회원가입이 성공적으로 완료되었습니다.", newUser };
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
        "이메일 또는 비밀번호를 다시 확인해주세요",
        400,
      );
    }
    const tokenPayload = {
      userId: user._id,
      email: user.email,
      isAdmin: user.is_admin
    };

    const encodedToken = await new Promise((resolve, reject) => {
      jwt.sign(
        tokenPayload,
        JWT_SECRET,
        //{ expiresIn: '24h' },
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
    const { password, isAdmin, ...userInfoWithoutSensitive } = userInfo;
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
    const patchedUserComplaint = await userRepository.incrementComplaintById(userId);
    if (!patchedUserComplaint) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '해당 회원이 존재하지 않습니다',
        404,
      );
    }
    return { message: '리뷰 신고가 성공적으로 완료되었습니다.', patchedUserComplaint};
  } 

  // 관리자 모든 회원 정보 조회

  async getUsers() {
    const users = await userRepository.allUsers();
    if (!users.length === 0) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        "회원목록이 존재하지 않습니다.",
        404,
      );
    }
    return users;
  }
  

  // 관리자 회원 정보 삭제
  async deleteUser(id) {
    const deletedUser = await userRepository.deleteById(id);

    if (deletedUser=== null) {
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
