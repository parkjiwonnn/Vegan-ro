const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const UserRepository = require('../user/user-repository');
const jwt = require('jsonwebtoken');
const config = require('../config');

const KAKAO_ID = config.clientID;

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: KAKAO_ID,
        callbackURL: '/auth/kakao/callback',
      },

      async (accessToken, refreshToken, profile, done) => {
        console.log('kakao profile', profile);
        console.log("accessToken : " + accessToken);
        console.log("refreshToken : " + refreshToken);
        try {
          const exUser = await UserRepository.findUserOne({
            where: {
              email: profile._json.kakao_account.email,
            },
          });
          // 기존 사용자일 경우
          if (exUser) {
            const token = jwt.sign(
              {
                userId: exUser.userId,
              },
              process.env.JWT_SECRET,
              {
                expiresIn: '1h'  // 토큰의 유효 시간을 1시간으로 설정
              }
            );
            return done(null, token);
          } 
            // 새로운 사용자일 경우
            const newUser = await UserRepository.createUser({
              email: profile._json.kakao_account.email,
              nickName: profile.displayName,
            });

            const token = jwt.sign(
              {
                userId: newUser.userId,
              },
              process.env.JWT_SECRET,
              {
                expiresIn: '1h'  // 토큰의 유효 시간을 1시간으로 설정
              }
            );
            console.log("token : " + token);
            return done(null, token);
          
        } catch (error) {
          console.error("Kakao login error:", error);
          return done(error);
        }
      },
    ),
  );
};
