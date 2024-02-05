const express = require('express');
const router = express.Router();
const { renderJoin, renderMain, renderProfile } = require('../controllers/page');
const { isLoggedIn } = require('../middlewares');

//아래 라우터들에서 공통적으로 사용가능한 변수를 선언 
router.use((req, res, next) => {
    // layout.html에 있
    res.locals.user = null;
    res.locals.followerCount = 0;
    res.locals.followingCount = 0;
    res.locals.followingList = [];
    next(); // 집어넣어야 미들웨어 동작한다
});

// isLoggedIn은 middlewares안에 있는 index안에 있는 함수이다 
router.get('/profile', isLoggedIn, renderProfile);
router.get('/join', renderJoin);
router.get('/', renderMain);

module.exports = router;