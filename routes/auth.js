const express = require('express');
const passport = require('passport');
const { isLoggedIn, inNotLoggedIn, isNotLoggedIn } = require('../middlewares');
const { join, login, logout } = require('../controllers/auth');

const router = express.Router();

// Post /auth/join
router.post('/join', isNotLoggedIn, join);

//Post /auth/login
router.post('/login', isNotLoggedIn, login);

// Get /auth/logout
router.get('/logout', isLoggedIn, logout);

/*
//local 일때 passport안에 index 파일안에 local로 넘어간다 
router.post('/auth/login', passport.authenticate('local'), () => {
    req.login();
});
*/
module.exports = router;