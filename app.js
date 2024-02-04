const express = require('express');
const cookieParser = require('cookie-parser');
//요청과 응답 로그값 출력 라이브러리
const morgan = require('morgan');
const path = require('path');
// const axios = require('axios');
// const redis = require('redis');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dontenv = require('dotenv');

// index 안에 있는 sequelize 객체를 지칭한다
const { sequilize } = require('./models');


// .env 에 작성한 설정값들이
// process.env 안에 값이 들어간다 
dontenv.config();

const pageRouter = require('./routes/page');
const exp = require('constants');

const app = express();
app.set('port', process.env.PORT || 8001);
app.set('view engine', 'html');

//html nunjucks 로 불러서 실행하겠다
nunjucks.configure('views', {
    express: app,
    watch: true,
});

//sync 함수를 호출해야 연결이 된것이다 
sequilize.sync() //{force: true} 집어넣으면 테이블을 제거했다가 다시 생성한다
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    })

// 개발할때만 로그를 출력하게한다
app.use(morgan('dev'));

//public 폴더를 static으로 만든다
// 현제 위치 app.js 의 __dirname(파일이름)인 public 을 지칭한다
app.use(express.static(path.join(__dirname, 'public')));
//json으로도 요청 가능
app.use(express.json());
//form 요청 가능
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        // 브라우저에서만 접근 가능하게
        httpOnly: true,
        // 나중에 https 사용할대 true
        secure: false,
    }
}));

app.use('/', pageRouter);

//404 미들웨어
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다`);
    error.status = 404;
    next(error);
});

//에러 처리 미들웨어
app.use((err, req, res, enxt) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}; // 배포모드가 아니면 에러모드 표시한
    res.status(err.status || 500);
    res.render('error'); // views 안에 error.html
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});