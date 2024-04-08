const userService = require('./user-service');
const errors = require('../errors/responseFormat');
const userRepository = require('./user-repository');
const config = require('../config');
const jwt = require('jsonwebtoken');

const JWT_SECRET = config.JWT_SECRET;

const userController = {
  //회원가입
  async createUser(req, res, next) {
    try {
      const {
        email,
        password,
        name,
        nickname,
        phone,
        tag,
        img,
        is_admin,
        complaint,
        deleted_at,
      } = req.body;
      const newUser = await userRepository.createUser({
        email,
        password,
        name,
        nickname,
        phone,
        tag,
        img,
        is_admin,
        complaint,
        deleted_at,
      });

      res.status(201).json(utils.buildResponse(newUser));
    } catch (e) {
      next(e);
    }
  },
  //로그인
  async postSignIn(req, res, next) {
    try {
      const { email } = req.body;
      const token = await userService.signIn({
        email,
      });
      // res.status(201).json(utils.buildResponse(token));
      res.status(201).json(errors.buildResponse({ token: `Bearer ${token}` }));
    } catch (e) {
      next(e);
    }
  },

  // 회원 정보 조회
  async getUserInfo(req, res, next) {
    try {
      const email = req.user.email;
      const userInfo = await userService.getUserInfo(email);
      res.json(errors.buildResponse(userInfo));
    } catch (error) {
      next(error);
    }
  },

  // 회원 정보 수정
  async putUserInfo(req, res, next) {
    try {
      const email = req.user.email;
      const { nickname, tag, img } = req.body;
      const user = await userService.updateUserInfo(email, {
        nickname,
        tag,
        img,
      });
      res.json(errors.buildResponse(user));
    } catch (error) {
      next(error);
    }
  },

  // 회원 탈퇴
  async patchUserInfo(req, res, next) {
    try {
      const email = req.user.email;
      const user = await userService.patchUserInfo(email);
      res.json(errors.buildResponse(user));
    } catch (error) {
      next(error);
    }
  },

  // 관리자 모든 회원 정보 조회
  async getUsers(req, res, next) {
    try {
      const users = await userService.getUsers();
      res.json(errors.buildResponse(users));
    } catch (e) {
      console.log('회원목록을 불러오지 못했습니다.');
      next(e);
    }
  },

  // 관리자 회원 삭제
  async deleteUser(req, res, next) {
    try {
      const userId = req.user._id;
      const user = await userService.deleteUser(userId);
      res.json(errors.buildResponse(user));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;
