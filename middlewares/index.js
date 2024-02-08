exports.isLoggedIn = (req, res, next) => { //passport 통해서 로그인 했니 
    if (req.isAuthenticated()) { //isAuthenticated() 는 passport에서 extends 되어있다 
        next();
    } else {
        res.status(403).send('로그인 필요');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        const message = encodeURIComponent('로그인한 상태입니다');
        res.redirect(`/?error=${message}`); //localhos:8001?error=메시지 
    }
}