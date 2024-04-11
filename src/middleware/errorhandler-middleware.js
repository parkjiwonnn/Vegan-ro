const AppError = require('../errors/AppError');

// 에러 핸들러 미들웨어 정의
function errorHandlerMiddleware(err, req, res, next) {
  if (err instanceof AppError) {
    // AppError 인스턴스인 경우
    res.status(err.httpCode).json({
      error: {
        name: err.name,
        description: err.message,
      },
    });
  } else {
    // 기타 에러의 경우
    res.status(500).json({
      error: {
        name: 'InternalServerError',
        description: '서버 내부 에러가 발생했습니다.',
      },
    });
  }
}

module.exports = errorHandlerMiddleware;
