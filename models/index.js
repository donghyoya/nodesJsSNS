const Sequelize = require('sequelize');

const fs = require('fs');
const path = require('path');

const User = require('./user');
const Post = require('./post');
const HashTag = require('./hashtag');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const db = {};
// 연결한게 아니다 연결이라는 것을 만들기만 한것이다
const sequelize = new Sequelize(config.database, config.username, config.password, config);


//sequelize 연결 이때 db라는 객체로 묶었다
db.sequelize = sequelize;

const basename = path.basename(__filename); //index.js 제외 
fs.readdirSync(__dirname)
    .filter(file => {
        //숨김 파일과 indexjs 파일 제외 그리고 마지막 확장명이 js파일인것만 
        return file.indexOf('.') !== 0 && file != basename && file.slice('.js');
    })
    .forEach((file) => {
        // models 파일 안에 모든 모델들
        const model = require(path.join(__dirname, file));
        console.log(file, model.name);
        db[model.name] = model;
        //initiate 먼저 다하고 associate 해야한다 
        model.initiate(sequelize);
    });

Object.keys(db).forEach(modelName => {
    //코드 출력하면서 테스트 해보자
    console.log(db, modelName);
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
})

/* 위에서 자동화 되어있다
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
*/

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