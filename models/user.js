const Sequelize = require('sequelize');

class User extends Sequelize.Model {
    static initiate(sequelize) {
            /*
            email, snsId 가 둘다 null 허용으로 되어있다
            이는 둘중 하나라도 가지고잇으면 되기 때문이다
            그
            */
            User.init({
                /*
                속성명: email
                속성 타입: String(40자 이내)
                Null 허용여부: true
                유일값(중복값x): true
                */
                email: {
                    type: Sequelize.STRING(40),
                    allowNull: true,
                    unique: true,
                },
                nick: {
                    type: Sequelize.STRING(15),
                    allowNull: false,
                },
                password: {
                    type: Sequelize.STRING(100),
                    allowNull: true,
                },
                /*
                속성명: provider
                속성 타입: String(단, 'local', 'kakao' 값만 들어갈수있음)
                null 허용여부: false(허용안함)
                기본값(추가할때 따로 지정안해놓을시): 'local'
                */
                provider: {
                    type: Sequelize.ENUM('local', 'kakao'),
                    allowNull: false,
                    defaultValue: 'local',
                },
                snsId: {
                    type: Sequelize.STRING(30),
                    allowNull: true,
                }
            }, {
                // validate
                sequelize,
                timestamps: true, //createAt, updatedAt(유저 생성일, 유저 정보 수정일때 자동으로 기록)
                underscored: false, // true일때 created_at, updated_at으로 변경된다
                modelName: 'User',
                tableName: 'users',
                paranoid: true, // deletedAt 유저 삭제일 -> 삭제일이 있을때 삭제된 데이터 즉, soft delete이ek 
                charset: 'utf8mb4', //이모티콘 까지 저장하겠다하면 utf8mb4 로 두자 
                collate: 'utf8_general_ci',
            })
        }
        // 관계 관련해서 여기서 한다
    static associations(db) {
        db.User.hasMany(db.Post);
        //User가 User 팔로잉 
        db.User.belongsToMany(db.User, { //팔로워
            foreignkKey: 'follingId',
            as: 'Followers',
            through: 'Follow',
        })
        db.User.belongsToMany(db.User, { //팔로잉
            foreignkKey: 'followerId',
            as: 'Followings',
            through: 'Follow',
        })
    }
}

module.exports = User;

/*
model의 기본구조 springboot의 entity 부분이라고 생각하면 
class User extends Sequelize.Model{
    static initiate(sequelize){

    }

    static associations(db){}
}

module.exports = User;
*/