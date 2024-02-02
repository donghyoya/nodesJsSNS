const Sequelize = require('sequelize');


class Post extends Sequelize.Model {
    static initiate(sequelize) {

    }

    static associations(db) {}
}

module.exports = Post;