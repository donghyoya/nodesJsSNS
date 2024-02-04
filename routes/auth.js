const express = require('express');
const router = express.Router();
const passport = require('passport');

//local 일때 passport안에 index 파일안에 local로 넘어간다 
router.post('/auth/login', passport.authenticate('local'), () => {
    req.login();
});

module.exports = router;