const User = require('../models/user');
const bcrypt = require('bcrypt');
const { app } = require('express');
const passport = require('passport');
/*
1. /auth/login 라우터를 통해 로그인 요청이 들어옴 
2. 라우터에서 passport.authenticate 메서드 호출
3. 로그인 전략(LocalStrategy) 수행
4. 로그인 성공 시 사용자 정보 객체와 함께 req. login 호출
5. req.login 메서드가 passport.serializeUser 호출
6. req.session에 사용자 아이디만 저장해서 세션 생성
7. express-session에 설정한 대로 브라우저에 connect.sid 세션 쿠키 전송
8. 로그인 완료


1. 요청이 들어옴(어떠한 요청이든 상관없음)
2. 라우터에 요청이 도달하기 전에 passport.session 미들웨어가 passport.deserializeUser 메서드 호출
3. connect.sid 세션 쿠키를 읽고 세션 객체를 찾아서 req.session으로 만듦
4. req.session에 저장된 아이디로 데이터베이스에서 사용자 조회
5. 조회된 사용자 정보를 req.user에 저장
6. 라우터에서 req.user 객체 사용 가능
*/

// 프론트에서 요청이오면  (join.html 에서 emain, nick, password)
exports.join = async(req, res, next) => {
    const { nick, email, password } = req.body;
    try {
        //이메일 있는지 확인하다 
        const exUser = await User.findOne({ where: { email } });
        if (exUser) {
            return res.redirect('/join?error=exist');
        }

        //이매일 있으시 아래 동작 
        const hash = await bcrypt.hash(password, 12);

        await User.create({
            email,
            nick,
            password: hash,
        });
        return res.redirect('/'); //return 302 즉 성공 

    } catch (error) {
        console.error(error);
        next(error);
    }
}

exports.login = () => {
        //passport index에 값 송신 
        // localStrategy 에서 리턴된 done값이 여기(authError, user, info)로 들어간다
        // 자동으로 passport-local 라이브러리 호출되게끔 매핑이 되어있따 
        passport.authenticate('local', (authEror, user, info) => {
            if (authEror) {
                console.error(authEror);
                return next(authEror);
            }
            if (!user) {
                return res.redirect(`/?loginError=${info.message}`);
            }
            //로그인 성공 
            return req.login(user, (loginError) => {
                //혹시 모를 에러를 위해서
                if (loginError) {
                    console.error(loginError);
                    return next(loginError);
                }
                return res.redirect('/');
            })(req, res, next);
        });
    }
    /*
    passport-kakao는 라이브러리 개발한 사람 마음이기 때문에 다르ek
    */
    // app.use(passport.authenticate('kakao'));
    // app.use((req, res, next) => passport.authenticate('kakao')(req, res, next));

exports.logout = (req, res, next) => { // 세션쿠키의 키와 해당 키의 값을 없에버린다 
    req.logout(() => { // 브라우저의 connect.sid 가 남아있어도 세션에 삭제되어있기에 상관 x
        res.redirect('/');
    })
}