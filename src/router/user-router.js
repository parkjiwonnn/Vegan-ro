const express = require('express');
const userRouter = express.Router();
const userController = require('../user/user-controller');
const authMiddleware = require('../middleware/auth-middleware');
const validationMiddleware = require('../middleware/validation-middleware');
const passport = require('passport');
const config = require('../config');
const errors = require('../errors/responseFormat');
const axios = require('axios');
const REDIRECT_URL = config.REDIRECT_URL;

// POST 요청 처리
userRouter.post('/auth/kakao/login', async (req, res) => {
  const { code } = req.body; // 프론트에서 받은 인가 코드

  try {
    // 카카오로부터 사용자 정보를 가져옵니다.
    const kakaoUserInfo = await requestUserInfoFromKakao(code);

    // 카카오 사용자 정보를 기반으로 우리 서비스의 토큰을 생성합니다.
    const token = await generateTokenFromKakaoUserInfo(kakaoUserInfo);

    // 생성된 토큰을 클라이언트로 전달합니다.
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error processing Kakao login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 카카오로부터 사용자 정보를 가져오는 함수
const requestUserInfoFromKakao = async (code) => {
  try {
    const response = await axios.post('https://kauth.kakao.com/oauth/token', {
      grant_type: 'authorization_code',
      client_id: 'b3bc79737b4fcbc77096caf5a631f774', // 카카오 앱의 클라이언트 ID
      redirect_uri: 'http://localhost:3000',
      code: code,
    });
    const accessToken = response.data.access_token;
    const userInfoResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return userInfoResponse.data;
  } catch (error) {
    throw new Error('카카오 사용자 정보를 가져오는 중 에러 발생');
  }
};
// 카카오 사용자 정보를 기반으로 토큰을 생성하는 함수
const generateTokenFromKakaoUserInfo = async (kakaoUserInfo) => {
  try {
    const exUser = await UserRepository.findUserOne({
      email: kakaoUserInfo.kakao_account.email,
    });
    // 기존 사용자일 경우
    if (exUser) {
      const token = jwt.sign(
        {
          userId: exUser._id,
          email: exUser.email,
          isAdmin: exUser.is_admin
        },
        JWT_SECRET,
      );
      return token;
    }
    // 새로운 사용자일 경우
    const newUser = await UserRepository.createUserForKakao({
      email: kakaoUserInfo.kakao_account.email,
    });

    const token = jwt.sign(
      {
        userId: newUser._id,
        email: newUser.email,
        isAdmin: newUser.is_admin
      },
      JWT_SECRET,
    );
    console.log('token : ' + token);
    return token;
  } catch (error) {
    console.error('Error generating token from Kakao user info:', error);
    throw new Error('토큰 생성 중 에러 발생');
  }
};

// userRouter.get('/kakao', passport.authenticate('kakao'));


userRouter.get(
  '/kakao/callback/omg',
  passport.authenticate('kakao', {
    failureRedirect: '/', // kakaoStrategy에서 실패한다면 실행
  }),
  // kakaoStrategy에서 성공한다면 콜백 실행
  (req, res) => {
    const token = req.user; // 사용자 토큰 정보 (JWT 토큰)
    const query = '?token=' + token;
    res.cookie('token', token, {
      sameSite: 'None',
      secure: true
    });
    res.redirect('https://veganro-frontend.vercel.app');
  },
);
//회원 로그아웃
userRouter.get('/kakao/logout', (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.error(err);
      return res.redirect('/'); // 로그아웃 중 에러가 발생한 경우에 대한 처리
    }
    res.redirect(REDIRECT_URL); // 로그아웃 성공 시 리다이렉트
  });
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
