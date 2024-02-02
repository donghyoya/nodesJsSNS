const express = require('express');
const router = express.Router();
const { renderJoin, renderMain, renderProfile } = require('../controllers/page');

//아래 라우터들에서 공통적으로 사용가능한 변수를 선언 
router.use((req, res, next) => {
    // layout.html에 있
    res.locals.user = null;
    res.locals.followerCount = 0;
    res.locals.followingCount = 0;
    res.locals.followingList = [];
    next(); // 집어넣어야 미들웨어 동작한다
});


router.get('/profile', renderProfile);
router.get('/join', renderJoin);
router.get('/', renderMain);

module.exports = router;