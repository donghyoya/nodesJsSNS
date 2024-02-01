exports.renderProfile = (req, res, next) => {
    // 서비스를 호출
    res.render('profile', { title: '내정보 - NodeBird' });
};
exports.renderJoin = (req, res, next) => {
    res.render('join', { title: '회원 가입 - NOdeBird' });
};
exports.renderMain = (req, res, next) => {
    res.render('main', {
        title: 'NodeBird',
        twits: [],
    });
};

// 라우터 -> 컨트롤러(요청, 응답) -> 서비스(요청, 응답 모름)