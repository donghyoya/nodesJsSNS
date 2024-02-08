const express = require('express');
const router = express.Router();
const { renderJoin, renderMain, renderProfile } = require('../controllers/page');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');

//아래 라우터들에서 공통적으로 사용가능한 변수를 선언 
router.use((req, res, next) => {
    // layout.html에 있
    res.locals.user = req.user;
    res.locals.followerCount = 0;
    res.locals.followingCount = 0;
    res.locals.followingList = [];
    // req.session.data = '123'; 사용자의 딸려있는 데이터를 확인 가능 
    next(); // 집어넣어야 미들웨어 동작한다
});

// isLoggedIn은 middlewares안에 있는 index안에 있는 함수이다 
// isLoggedIn은 로그인된 상태인지 확인 
//즉 profile을 확인하기 위해서 로그인이 되어있어야하기때문에 로그인여부 확인
router.get('/profile', isLoggedIn, renderProfile);
// 로그인이 안되어있는지 확인하는것.
// 로그인이 안되어있으면 회원가입 페이지로
router.get('/join', isNotLoggedIn, renderJoin);
router.get('/', renderMain);

module.exports = router;