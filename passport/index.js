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
            .then((user) => done(null, user))
            .catch(err => done(err));
    });

    //localStrategy 호출 
    local();
};