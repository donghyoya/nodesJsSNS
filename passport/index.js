const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');

const User = require('../models/user');



module.exports = () => {
    passport.serializeUser((user, done) => { // user == exUser(controller 안에있는 객체)
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findOne({ where: { id } })
            // req.user, req.session 이 같이 생성된다 
            //(정확히는 connect.sid 쿠키로 세션에서 찾을때 req.session이 생성 )
            .then((user) => done(null, user))
            .catch(err => done(err));
    });

    //localStrategy 호출 
    local();
};