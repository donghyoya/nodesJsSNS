const User = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');

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
    passport.authenticate('local', (authEror, user, info) => {});
}

exports.logout = () => {

}