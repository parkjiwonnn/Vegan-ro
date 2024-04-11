const userRepository = require('./user-repository');
const AppError = require('../errors/AppError');
const commonErrors = require('../errors/commonErrors');
const config = require('../config');
const jwt = require('jsonwebtoken');

class UserService {
  //로그인
  async signIn({ email }) {
    const user = await userRepository.findByEmail(email);
    if (user === null) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '이메일 또는 비밀번호를 다시 확인해주세요', //유저가 없는 경우더라도 보안을 위해 이메일과 비밀번호 체크해달라는 에러 던지기
        400,
      );
    }

    const tokenPayload = {
      userId: user._id,
      email: user.email,
      is_admin: user.is_admin
    };

    const encodedToken = await new Promise((resolve, reject) => {
      jwt.sign(
        tokenPayload,
        config.JWT_SECRET,
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
  async updateUserInfo(email, { nickname, tag, tag_img }) {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '해당 회원이 존재하지 않습니다',
        404,
      );
    }

    const updatedUserInfo = await userRepository.updateByEmail(email, {
      nickname,
      tag,
      tag_img,
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
