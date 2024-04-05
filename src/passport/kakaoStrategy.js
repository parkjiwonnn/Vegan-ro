const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const UserRepository = require('../user/userRepository');
const jwt = require('jsonwebtoken');  


module.exports = () => {
    passport.use(
        new KakaoStrategy(
           {
              clientID: 'ac8b0121ca4524e28175f611286173c9',
              callbackURL: '/auth/kakao/callback', 
           },
          
           async (accessToken, refreshToken, profile, done) => {
            console.log('kakao profile', profile);
            console.log(accessToken);
            console.log(refreshToken);
            try {
               const exUser = await UserRepository.findOne({
                   where: {
                       email: profile._json.kakao_account.email,
                   }
               });
               // 기존 사용자일 경우
               if (exUser) {
                 const token = jwt.sign(
                   {
                     userId: exUser.userId,
                   },
                   process.env.JWT_SECRET
                 );
                 return done(null, token);
               } else {
                 // 새로운 사용자일 경우
                 const newUser = await UserRepository.create({
                   email: profile._json.kakao_account.email,
                   nickName: profile.displayName,
                 });
     
                 const token = jwt.sign(
                   {
                     userId: newUser.userId,
                   },
                   process.env.JWT_SECRET
                 );
                 console.log(token);
                 return done(null, token);
               }
             } catch (error) {
               console.error(error);
               done(error);
             }
           }
         )
       );
     };