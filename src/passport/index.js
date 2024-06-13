const passport = require('passport');
const kakao = require('./kakaoStrategy'); // 카카오서버로 로그인할때
const jwt = require('jsonwebtoken');
const User = require('../user/user-repository');
const config = require('../config');

const JWT_SECRET = config.JWT_SECRET;

module.exports = () => {
  passport.serializeUser((token, done) => {
    console.log('시리얼라이즈 유저', User); // user는 tokenUser다.
    // 로그인 시, 사용자 데이터를 세션에 저장하는데
    done(null, token);
  });

  passport.deserializeUser((accessToken, done) => {
    console.log('디시리얼라이즈 유저', accessToken);
    // 토큰을 이용하여 사용자를 인증 또는 사용자 정보를 가져오는 로직 구현
    const decoded = jwt.verify(accessToken, JWT_SECRET);
    const userId = decoded.userId;

    User.findUserById(userId)
      .then((user) => {
        done(null, user); // 사용자 객체를 세션에서 가져옴
      })
      .catch((err) => {
        done(err);
      });
  });

  kakao();
};
