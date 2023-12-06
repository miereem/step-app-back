const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://s343056:a8x3u3Xyid768O1I@localhost:8933/studs');

const BuildingModel = require("./Building");

const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
});

Category.hasMany(BuildingModel);




const CategoryModel = sequelize.models.Category;
module.exports = CategoryModel;