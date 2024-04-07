const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const config = require('./config');
const passport = require('passport');
const passportConfig = require('./passport');
const path = require('path');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// express-session 미들웨어 설정
app.use(
  session({
    secret: 'your_secret_key', // 세션을 암호화하기 위한 비밀키
    resave: false, // 세션을 항상 저장할지 여부를 정하는 값 (권장: false)
    saveUninitialized: true, // 초기화되지 않은 세션을 스토어에 저장할지 여부 (권장: true)
    cookie: {
      domain: ' ', // 프론트엔드와 연결한 도메인으로 설정하면 모든 서브도메인에서 쿠키를 사용할 수 있습니다.
      path: '/', // /로 설정하면 모든 페이지에서 쿠키를 사용할 수 있습니다.
      secure: false, // https가 아닌 환경에서도 사용할 수 있습니다.
      httpOnly: false, // 자바스크립트에서 쿠키를 확인할 수 있습니다.
    }, // https를 사용하는 경우 true로 설정
  }),
);

app.use(passport.initialize());
app.use(passport.session());

const viewRouter = require('./views/view-router');
app.use('/', viewRouter); // viewRouter 미들웨어 등록

app.use(viewRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api', (req, res) => {
  res.send('백엔드 api 서버');
});

passportConfig(passport);

const userRouter = require('./user/user-router');

app.use('/auth', userRouter);

const apiRouter = require('./router/index');

app.use('/api', apiRouter);

//connect to mongodb
const MONGO_URI = config.mongoDBUri;
mongoose.connect(MONGO_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('📍 Connected to MongoDB');
});

module.exports = app;
