const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');
const errors = require('../errors/responseFormat');
const AppError = require('../errors/AppError');
const commonErrors = require('../errors/commonErrors');

const JWT_SECRET = config.JWT_SECRET;

const authenticate = (req, res, next) => {
  passport.authenticate('kakao', (err, token) => {
    if (err) return next(err);
    if (!token) {
      return res.redirect('/login'); // 로그인 실패 시 리다이렉트할 URL
    }
    next();
  })(req, res, next);
};

const isAuthenticated = (req, res, next) => {
  const token = req.headers['authorization'].slice(7);

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
  const token = req.headers['authorization'].slice(7);

  if (!token) {
    return res
      .status(401)
      .json(errors.buildResponse({ message: '토큰이 없습니다.' }));
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json(errors.buildResponse({ message: '토큰 인증에 실패했습니다.' }));
    }

    if (!decoded.is_admin) {
      return res
        .status(403)
        .json(errors.buildResponse({ message: '접근 권한이 없습니다.' }));
    }

    req.user = decoded;  // 요청 객체에 사용자 정보 추가
    next();
  });
};

module.exports = {
  isAdmin,
  isAuthenticated,
  authenticate,
};
