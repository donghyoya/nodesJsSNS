const User = require('../models/user');
const Post = require('../models/post');

exports.follow = async() => {
    //req.user.id, req.params.id
    try {
        const user = await User.findOne({
            where: { id: req.user.id },
        });
        //db에 없을수도 있기에 안정장치
        if (user) {
            await user.addFollewing(parseInd(req.params.id, 10));
            res.send('success');
        } else {
            res.status(404).send('no user');
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}