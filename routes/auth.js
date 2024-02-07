const express = require('express');
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { join, login, logout } = require('../controllers/auth');

const router = express.Router();

// Post /auth/join
router.post('/join', isNotLoggedIn, join);

//Post /auth/login
router.post('/login', isNotLoggedIn, login);

// Get /auth/logout
router.get('/logout', isLoggedIn, logout);

// Get /auth/kakao
// 자동으로 카카오 로그인 화면으로 redirect 해준다
// auth/kakao -> 카카오톡 로그인 화면 -> /auth/kakao/callback 연달아 리다이렉트 된다 
router.get('/kakao', passport.authenticate('kakao'));

//Get /auth/kakao/callback
router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/?loginError=카카오로그인 실패'
}), (req, res) => {
    res.redirect('/');
});

/*
//local 일때 passport안에 index 파일안에 local로 넘어간다 
router.post('/auth/login', passport.authenticate('local'), () => {
    req.login();
});
*/
module.exports = router;