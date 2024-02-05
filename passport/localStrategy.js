// 여기서 상대방이 로그인해도 되는지 안돼는지 판단함
const passport = require('passport');
const User = require('../models/user');
const bcrypt = require('bcrypt');
// const localStrategy = require('passport-local').Strategy; 예전 문법 
const { Strategy: LocalStrategy } = require('passport-local');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email', // req.body.email
        passwordField: 'password', //req.body.password
        passReqToCallback: false, //true 일때 async 에 req가 추가된다(req, email, password, done)
    }, async(email, password, done) => { //done(서버실패, 성공유저, 로직실패)
        // 서버 실패는 db문법이 틀렸거나
        // 성공유저는 리턴할 사용자 정보 집어넣는다
        // 로직실패는 서버의 에러는 없지만 로그인 시키면 안돼는이유 
        try {
            const exUser = await User.findOne({ where: { email } });
            if (exUser) {
                // 입력받은 비번이랑 db에 저장된 비번이랑 비교한다 
                const result = await bcrypt.compare(password, exUser.password);
                if (result) {
                    done(null, exUser);
                } else {
                    done(null, false, { message: '비밀번호가 틀렸습니다' });
                }
            } else {
                done(null, false, { message: '가입되지 않은 회원입니다' });
            }
        } catch (error) {
            console.log(error);
            done(error);
        }
    }))
};