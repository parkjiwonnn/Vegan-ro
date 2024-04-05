const passport = require('passport');
const jwt = require('jsonwebtoken');


const authenticate = (req, res, next) => {
  passport.authenticate('kakao', (err, user) => {
    if (err) return next(err);
    if (!user) {
      return res.redirect('/login'); // 로그인 실패 시 리다이렉트할 URL
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      const token = jwt.sign(
        {
          userId: user.userId,
        },
        process.env.JWT_SECRET,
      );
      res.locals.token = token;  // 로컬 변수에 토큰 저장
      return next();
    });
  })(req, res, next);
};

const isAdmin = (req, res, next) => {
  // 여기에 관리자 여부를 확인하는 로직을 추가하세요.
  if (req.user && req.user.is_admin) {
    return next();
  }
  return res.status(403).json({ message: '관리자 권한이 필요합니다.' });
};

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: '인증되지 않은 사용자입니다.' });
};


module.exports = {
  isAdmin,
  isAuthenticated,
  authenticate,
};
