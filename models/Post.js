const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://s343056:a8x3u3Xyid768O1I@localhost:8933/studs');

const Post = sequelize.define('Post', {
    owner: DataTypes.STRING,
    title: DataTypes.STRING,
    place: DataTypes.INTEGER,
    photos: DataTypes.ARRAY(DataTypes.STRING),
    description: DataTypes.STRING,
});

const PostModel = sequelize.models.Post;
module.exports = PostModel;