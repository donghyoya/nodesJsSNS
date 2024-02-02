const Sequelize = require('sequelize');

class HashTag extends Sequelize.Model {
    static initiate(sequelize) {

    }

    static associations(db) {}
}

module.exports = HashTag;