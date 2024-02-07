const passport = require('passport');
const User = require('../models/user');
const { Strategy: KakaoStrategy } = require('passport-kakao');

module.exports = () => {
    passport.use(new KakaoStrategy({
        clientId: process.env.KAKAO_ID,
        callbackURL: '/auth/kakao/callback',
    }, async(accessToken, refreshToken, profile, done) => {
        //카카오에서 profile 구조를 멋대로 변경하니 한번씩 확인해보자 
        console.log('profile', profile);
        try {
            const exUser = await User.findOne({
                where: { snsId: profile.id, provider: 'kakao' }
            });
            if (exUser) {
                done(null, exUser);
            } else {
                // 카카오 계정이 DB에 없으면 추가한다(즉 회원가)
                const newUser = await User.create({
                        email: profile._json ? .kakao_account ? .email, //요 구조가 자주 바뀐다 
                        nick: profile.displayName,
                        snsId: profile.id,
                        provider: 'kakao',
                    })
                    //done은 controller에 (authEror, user, info) 값으로 들어간다 
                done(null, newUser);
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
        done()
    }))
};