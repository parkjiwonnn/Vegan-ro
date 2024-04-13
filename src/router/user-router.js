const express = require('express');
const userRouter = express.Router();
const userController = require('../user/user-controller');
const userService = require('../user/user-service');
const authMiddleware = require('../middleware/auth-middleware');
const validationMiddleware = require('../middleware/validation-middleware');
const config = require('../config');
const responseFormat = require('../errors/responseFormat');


const REDIRECT_URL = config.REDIRECT_URL;

// POST 요청 처리
userRouter.post('/auth/kakao/login', async (req, res) => {
  const { code } = req.body; // 프론트에서 받은 인가 코드
  try {
    // 컨트롤러 함수를 호출하여 요청 처리
    const token = await userService.handleKakaoLogin(code);
    res.status(201).json(responseFormat.buildResponse({ token: `Bearer ${token}` }));
  } catch (error) {
    console.error('Error processing Kakao login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 회원가입
userRouter.post(
  '/signup',
  validationMiddleware.validateRequest,
  userController.postSignUp,
);

// 로그인
userRouter.post(
  '/login',
  validationMiddleware.validateRequest,
  userController.postSignIn,
);

// 회원 정보 조회
userRouter.get(
  '/users/me',
  authMiddleware.isAuthenticated,
  userController.getUserInfo,
);

// 회원 정보 수정
userRouter.put(
  '/users/me',
  authMiddleware.isAuthenticated,
  validationMiddleware.validateRequest,
  userController.putUserInfo,
);

// 회원 탈퇴
userRouter.patch(
  '/users/me/withdrawal',
  authMiddleware.isAuthenticated,
  validationMiddleware.validateRequest,
  userController.patchUserInfo,
);

//사용자 신고 카운트 증가
userRouter.patch(
  '/users/complaint/:reviewId',
  authMiddleware.isAuthenticated,
  validationMiddleware.validateRequest,
  userController.patchUserComplaint,
);
//관리자 페이지 접근
userRouter.get('/admin', authMiddleware.isAdmin);

// 관리자 모든 회원 정보 조회
userRouter.get(
  '/admin/users',
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  userController.getUsers,
);

// 관리자 회원 정보 삭제
userRouter.delete(
  '/admin/users/:userId',
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  userController.deleteUser,
);

module.exports = userRouter;
