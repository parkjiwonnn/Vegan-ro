const AppError = require('../errors/AppError');
const commonErrors = require('../errors/commonErrors');
const dotenv = require('dotenv');

const envFound = dotenv.config();

if (envFound.error) {
  throw new AppError(commonErrors.configError, "Couldn't find .env file");
}

if (process.env.MONGO_URI === undefined) {
  throw new AppError(
    commonErrors.configError,
    '어플리케이션을 시작하려면 Mongo DB URI(MONGODB_URI) 환경변수가 필요합니다.',
  );
}

module.exports = {
  applicationName: process.env.APPLICATION_NAME,

  port: parseInt(process.env.PORT, 10),

  mongoDBUri: process.env.MONGO_URI,

  clientID: process.env.KAKAO_ID, // 카카오 로그인에서 발급받은 REST API 키

  callbackURL: process.env.KAKAO_URL, // 카카오 로그인 Redirect URI 경로
 
  REDIRECT_URL: process.env.REDIRECT_URL,
};
