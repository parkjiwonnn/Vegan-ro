const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');
const errors = require('../errors/responseFormat');

const JWT_SECRET = config.JWT_SECRET;

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
          userId: user._id,
          email: user.email,
          name: user.name,
        },
        process.env.JWT_SECRET,
      );
      res.locals.token = token; // 로컬 변수에 토큰 저장
      return next();
    });
  })(req, res, next);
};

const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res
      .status(401)
      .json(errors.buildResponse({ message: '토큰이 없습니다.' }));
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json(errors.buildResponse({ message: '토큰 인증에 실패했습니다.' }));
    }
    req.user = user;
    next();
  });
};

const isAdmin = (req, res, next) => {
  // 여기에 관리자 여부를 확인하는 로직을 추가하세요.
  if (req.user && req.user.is_admin) {
    next(
      new AppError(
        commonErrors.authorizationError,
        '접근 권한이 없습니다.',
        403,
      ),
    );
    return;
  }
  next();
};

module.exports = {
  isAdmin,
  isAuthenticated,
  authenticate,
};
