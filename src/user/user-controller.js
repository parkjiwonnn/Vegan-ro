const userService = require('./user-service');
const reviewService = require('../review/review-service');
const responseFormat = require('../errors/responseFormat');
const userRepository = require('./user-repository');
const AppError = require('../errors/AppError');
const commonErrors = require('../errors/commonErrors');
const config = require('../config');
const jwt = require('jsonwebtoken');

const JWT_SECRET = config.JWT_SECRET;

const userController = {
  //회원가입
  async postSignUp(req, res, next) {
    try {
      const {email, password } = req.body;
      const newUser = await userService.signUp({
        email,
        plainPassword: password});
  
      res.status(201).json(responseFormat.buildResponse(newUser));
    } catch (error) {
      next(error);
    }
  },
  
  //로그인
  async postSignIn(req, res, next) {
    try {
      const { email, password } = req.body;
      const token = await userService.signIn({
        email,
        plainPassword: password,
      });
      res.status(201).json(responseFormat.buildResponse({ token: `Bearer ${token}` }));
    } catch (e) {
      next(e);
    }
  },

  // 회원 정보 조회
  async getUserInfo(req, res, next) {
    try {
      const email = req.user.email;
      const userInfo = await userService.getUserInfo(email);
      res.json(responseFormat.buildResponse(userInfo));
    } catch (error) {
      next(error);
    }
  },

  // 회원 정보 수정
  async putUserInfo(req, res, next) {
    try {
      const email = req.user.email;
      const { nickname, tag } = req.body;
      const user = await userService.updateUserInfo(email, {
        nickname,
        tag,
      });
      res.json(responseFormat.buildResponse(user));
    } catch (error) {
      next(error);
    }
  },

// 컨트롤러
async patchUserComplaint(req, res, next) {
  try {
    const { reviewId } = req.params;
    const patchedUserComplaint = await userService.incrementComplaintByReviewId(reviewId);
    res.json(responseFormat.buildResponse(patchedUserComplaint));
  } catch (error) {
    next(error);
  }
},

  // 회원 탈퇴
  async patchUserInfo(req, res, next) {
    try {
      const email = req.user.email;
      const user = await userService.patchUserInfo(email);
      res.json(responseFormat.buildResponse(user));
    } catch (error) {
      next(error);
    }
  },

  // 관리자 모든 회원 정보 조회
  async getUsers(req, res, next) {
    try {
      const users = await userService.getUsers();
      res.json(responseFormat.buildResponse(users));
    } catch (e) {
      console.log('회원목록을 불러오지 못했습니다.');
      next(e);
    }
  },

  // 관리자 회원 삭제
  async deleteUser(req, res, next) {
    try {
      const { userId } = req.params;
      const user = await userService.deleteUser(userId);
      res.json(responseFormat.buildResponse(user));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;
