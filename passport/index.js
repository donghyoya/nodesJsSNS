const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');

const User = require('../models/user');

/*
passport는 인증하는 부분이다
즉 로그인했을때, 회원가입할때 사용되는 부분이다
*/


module.exports = () => {
    passport.serializeUser((user, done) => { // user == exUser(controller 안에있는 객체)
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        /*
        자동적으로 로그인할때 해당 정보의 객체를 routes/page안에 
        req.user 안에 집어넣어진다
        res.locals.user = req.user;
        res.locals.followerCount = req.user.Followers.length
        res.locals.followingCount = req.user.Followings.length;
        res.locals.followingList = req.user.Followings.map(f=>f.id);

        근데 해당 작업을 page안에다가 작업이 가능하다.
        근데 반드시 로그인 작업후 할수있게금하자
        */
        User.findOne({
                where: { id },
                include: [{ //팔로잉
                        model: User,
                        attributes: ['id', 'nick'],
                        as: 'Followers',

                    },
                    { //팔로워
                        model: User,
                        attributes: ['id', 'nick'],
                        as: 'Followings',

                    },
                ]
            })
            // req.user, req.session 이 같이 생성된다 
            //(정확히는 connect.sid 쿠키로 세션에서 찾을때 req.session이 생성 )
            .then((user) => done(null, user))
            .catch(err => done(err));
    });

    //localStrategy 호출 
    local();
    //카카오 앱키가 안돼어서 일단 비활성화 
    // kakao();
};