const Sequelize = require('sequelize');

class HashTag extends Sequelize.Model {
    static initiate(sequelize) {
        HashTag.init({
            title: {
                type: Sequelize.STRING(15),
                allowNull: false,
            }
        })
    }

    static associations(db) {}
}

module.exports = HashTag;