const { userService } = require("./user-service");

const userController = {
   
    // 회원 정보 조회
    async getUserInfo(req, res, next) {
      try {
        const userEmail = res.locals.user.email;
        const userInfo = await userService.getUserInfo(userEmail);
        res.json(utils.buildResponse(userInfo));
      } catch (error) {
        next(error);
      }
    },
  
    // 회원 정보 수정
    async putUserInfo(req, res, next) {
      try {
        const userEmail = res.locals.user.email;
        const { password, new_password, user_name, address, address_detail, postal_code } = req.body;
        const user = await userService.updateUserInfo(userEmail, {
          plainPassword: password,
          new_password,
          user_name,
          address,
          address_detail,
          postal_code,
        });
        res.json(utils.buildResponse(user));
      } catch (error) {
        next(error);
      }
    },

     // 회원 탈퇴
  async patchUserInfo(req, res, next) {
    try {
      const userEmail = res.locals.user.email;
      const user = await userService.patchUserInfo(userEmail);
      res.json(utils.buildResponse(user));
    } catch (error) {
      next(error);
    }
  },
    
  // 관리자 모든 회원 정보 조회
  async getUsers(req, res, next) {
    try {
      const users = await userService.getUsers();
      res.json(utils.buildResponse(users));
    } catch (e) {
      console.log("회원목록을 불러오지 못했습니다.");
      next(e);
    }
  },

    // 관리자 회원 삭제
    async deleteUser(req, res, next) {
      try {
        const userEmail = res.locals.user.email;
        const user = await userService.deleteUser(userEmail);
        res.json(utils.buildResponse(user));
      } catch (error) {
        next(error);
      }
    },
  };
  
  module.exports = userController;
  