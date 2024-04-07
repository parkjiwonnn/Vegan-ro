const userRepository = require("./user-repository");
const AppError = require("../errors/AppError");
const commonErrors = require("../errors/commonErrors");


class UserService {

  // 회원정보수정
  async updateUserInfo(
    userEmail,
    { plainPassword, new_password, user_name, address, address_detail, postal_code },
  ) {
    const user = await userRepository.findByEmail(userEmail);
    
    if (!user) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        "해당 회원이 존재하지 않습니다",
        404
      );
    }

    const isPasswordValid = await bcrypt.compare(plainPassword, user.password);
    if (!isPasswordValid) {
      throw new AppError(
        commonErrors.inputError,
        "비밀번호를 다시 확인해주세요",
        400,
      );
    }

    if (new_password !== null) {
      plainPassword = new_password;
    } 

    const hashedPassword = await bcrypt.hash(plainPassword, 15);
    const updatedUserInfo = await userRepository.updateByEmail(userEmail, {
      password: hashedPassword,
      user_name,
      address,
      address_detail,
      postal_code,
    });
    
    return {
      message: "회원정보수정이 성공적으로 완료되었습니다.",
      updatedUserInfo,
    };
  }

  // 회원정보조회
  async getUserInfo(userEmail) {
    const userInfo = await userRepository.findByEmail(userEmail);
    
    if (!userInfo) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        "해당 회원이 존재하지 않습니다",
        404
      );
    }

    const { password, isAdmin, ...userInfoWithoutSensitive } = userInfo;
    return userInfoWithoutSensitive;
  }

/// 회원 탈퇴
async patchUserInfo(userEmail) {
    const patchedUser = await UserRepository.patchByEmail(userEmail);
    
    if (!patchedUser) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        "해당 회원이 존재하지 않습니다",
        404
      );
    }

    return { message: "회원정보가 성공적으로 삭제되었습니다.", deletedUser };
  }
    // 관리자 모든 회원 정보 조회
  async getUsers() {
    const users = await UserRepository.findUserOne({});
    return users;
  }
  
  // 관리자 회원 정보 삭제
  async deleteUser(userId) {
    const deletedUser = await UserRepository.deleteByEmail(userId);
    
    if (!deletedUser) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        "해당 회원이 존재하지 않습니다",
        404
      );
    }

    return { message: "회원정보가 성공적으로 삭제되었습니다.", deletedUser };
  }
}
module.exports = new UserService();
