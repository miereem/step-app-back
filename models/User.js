const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://s343056:a8x3u3Xyid768O1I@localhost:8933/studs');

const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    username: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    password: DataTypes.STRING,
});



const UserModel = sequelize.models.User;
module.exports = UserModel;