const Post = require('../models/post');
const User = require('../models/user');

xports.renderProfile = (req, res, next) => {
    // 서비스를 호출
    res.render('profile', { title: '내정보 - NodeBird' });
};
exports.renderJoin = (req, res, next) => {
    res.render('join', { title: '회원 가입 - NOdeBird' });
};
exports.renderMain = async(req, res, next) => {
    try {
        const posts = await Post.findAll({
            // 사용자 정보 집어넣기(개시글 작성자 확인)
            include: {
                model: User,
                attributes: ['id', 'nick'],
            },
            // 정렬 최신순
            order: ['[createdAt', 'DESC']
        })
        res.render('main', {
            title: 'NodeBird',
            twits: posts,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }

};

// 라우터 -> 컨트롤러(요청, 응답) -> 서비스(요청, 응답 모름)