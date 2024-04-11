const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const UserRepository = require('../user/user-repository');
const errors = require('../errors/responseFormat');
const jwt = require('jsonwebtoken');
const config = require('../config');

const KAKAO_ID = config.clientID;
const JWT_SECRET = config.JWT_SECRET;

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: KAKAO_ID,
        callbackURL: '/auth/kakao/callback',
      },

      async (accessToken, refreshToken, profile, done) => {
        console.log('kakao profile', profile);
        console.log('accessToken : ' + accessToken);
        console.log('refreshToken : ' + refreshToken);
        try {
          const exUser = await UserRepository.findUserOne({
            email: profile._json.kakao_account.email,
          });
          // 기존 사용자일 경우
          if (exUser) {
            const token = jwt.sign(
              {
                userId: exUser._id,
                email: exUser.email,
                is_admin: exUser.is_admin
              },
              JWT_SECRET,
              // {
              //   expiresIn: '24h',
              // },
            );
            return done(null, token);
          }
          // 새로운 사용자일 경우
          const newUser = await UserRepository.createUser({
            email: profile._json.kakao_account.email,
          });

          const token = jwt.sign(
            {
              userId: newUser._id,
              email: newUser.email,
              is_admin: newUser.is_admin
            },
            JWT_SECRET,
            // {
            //   expiresIn: '24h',
            // },
          );
          console.log('token : ' + token);
          return done(null, token);
        } catch (error) {
          console.error('Kakao login error:', error);
          return done(error);
        }
      },
    ),
  );
};
