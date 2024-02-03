const Sequelize = require('sequelize');

const fs = require('fs');
const path = require('path');

const User = require('./user');
const Post = require('./post');
const HashTag = require('./hashtag');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config, );


//sequelize 연결 이때 db라는 객체로 묶었다
db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.HashTag = HashTag;

//각 모델안에 initiate, associate 함수를 호출해야한다
User.initiate(sequelize);
Post.initiate(sequelize);
HashTag.initiate(sequelize);

User.associate(db);
Post.associate(db);
HashTag.associate(db);

module.exports = db;


/* 자동으로 생성된 코드에는 문제가 있기에 주석처리
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

*/