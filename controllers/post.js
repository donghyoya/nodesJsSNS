const Post = require('../models/post');
const HashTag = require('../models/hashtag');

exports.afterUploadImage = (req, res) => {
    consloel.log(req.file);
    res.json({ url: `/img/${req.file.filename}` });
}

exports.uploadPost = async(req, res, next) => {
    //req.body.content, req.body.url
    try {
        //이미지 저장 
        const post = await Post.create({
            content: req.body.content,
            img: req.body.url,
            UserId: req.user.id,
        });
        // /#[^\s#]*/g  -> 정규 표현식 # 의 대한 
        const hashtags = req.body.content.match(/#[^\s#]*/g);
        if (hashtags) {
            const result = await Promise.all(hashtags.map((tag) => {
                return HashTag.findOrCreate({
                    // slice 1은 앞에 # 땔려고 하는거다 
                    // toLowerCase 혹시모를 대문자를 소무낮로 모두 변환
                    where: { title: HashTag.slice(1).toLowerCase() }
                });
            }));
            console.log('result', result);
            //post와 hashtag를 연결(다대다 ㅇ녀결 )
            await post.addHashtags(result.map(results => results[0]));
            res.redirect('/');
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
};