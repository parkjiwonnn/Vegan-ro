const express = require('express');
const userRouter = express.Router();
const userController = require('./user-controller');
const userMiddleware = require('./user-middleware');
const passport = require('passport');

//* 카카오 로그인 라우터 /kakao로 요청오면, 카카오 로그인 페이지로 이동, 카카오 서버를 통해 카카오 로그인을 하면, 다음 라우터로 요청
userRouter.get('/kakao', passport.authenticate('kakao'));

// 위에서 카카오 서버 로그인이 되면, 카카오 redirect url 설정에 따라 이쪽 라우터로 오게 된다.
userRouter.get(
  '/kakao/callback',
  //passport 로그인 전략에 의해 kakaoStrategy로 가서 카카오계정 정보와 DB를 비교해서 회원가입시키거나 로그인 처리하게 한다.
  passport.authenticate('kakao', {
    failureRedirect: '/', // kakaoStrategy에서 실패한다면 실행
  }),
  // kakaoStrategy에서 성공한다면 콜백 실행
  (req, res) => {
    const token = req.user; // 사용자 토큰 정보 (JWT 토큰)
    const query = '?token=' + token;
    res.locals.token = token;

    res.redirect(`http://localhost:3000${query}`);
  },
);
//회원 로그아웃
userRouter.get('/kakao/logout', (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.error(err);
      return res.redirect('/'); // 로그아웃 중 에러가 발생한 경우에 대한 처리
    }
    res.redirect('http://localhost:3000/'); // 로그아웃 성공 시 리다이렉트
  });
});

// 회원 정보 조회
userRouter.get(
  '/users/me',
  userMiddleware.isAuthenticated,
  userController.getUserInfo,
);

// 회원 정보 수정
userRouter.put(
  '/users/me',
  userMiddleware.isAuthenticated,
  userController.putUserInfo,
);

// 회원 탈퇴
userRouter.patch(
  '/users/me/withdrawal',
  userMiddleware.isAuthenticated,
  userController.patchUserInfo,
);

// 관리자 모든 회원 정보 조회
userRouter.get(
  '/admin/user',
  userMiddleware.isAuthenticated,
  userMiddleware.isAdmin,
  userController.getUsers,
);

// 관리자 회원 정보 삭제
userRouter.delete(
  '/admin/user/:userId',
  userMiddleware.isAuthenticated,
  userMiddleware.isAdmin,
  userController.deleteUser,
);

module.exports = userRouter;
