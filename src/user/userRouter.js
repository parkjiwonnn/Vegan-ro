const express = require('express');
const userRouter = express.Router();
const passport = require('passport');

//* 카카오로 로그인하기 라우터 ***********************
//? /kakao로 요청오면, 카카오 로그인 페이지로 가게 되고, 카카오 서버를 통해 카카오 로그인을 하게 되면, 다음 라우터로 요청한다.
userRouter.get('/kakao', passport.authenticate('kakao'));

//? 위에서 카카오 서버 로그인이 되면, 카카오 redirect url 설정에 따라 이쪽 라우터로 오게 된다.
userRouter.get(
   '/kakao/callback',
   //? 그리고 passport 로그인 전략에 의해 kakaoStrategy로 가서 카카오계정 정보와 DB를 비교해서 회원가입시키거나 로그인 처리하게 한다.
   passport.authenticate('kakao', {
      failureRedirect: '/', // kakaoStrategy에서 실패한다면 실행
   }),
   // kakaoStrategy에서 성공한다면 콜백 실행
   (req, res) => {
   const token = req.user; // 사용자 토큰 정보 (예: JWT 토큰)
   const query = "?token=" + token;
   res.locals.token = token;

   res.redirect(`http://localhost:3000${query}`);
 }
);

userRouter.get("/kakao/logout", (req, res) => {
   req.logout(function (err) {
      if (err) {
        console.error(err);
        return res.redirect("/"); // 로그아웃 중 에러가 발생한 경우에 대한 처리
      }
      res.redirect("http://localhost:3000/"); // 로그아웃 성공 시 리다이렉트
    });
  });

module.exports = userRouter;