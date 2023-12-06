const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://s343056:a8x3u3Xyid768O1I@localhost:8932/studs');
const AddressModel = require("./Address");

const Building = sequelize.define('Building', {
    name: DataTypes.STRING,
    address: DataTypes.NUMBER,
    description: DataTypes.STRING,
    category: DataTypes.NUMBER,
});

Building.hasOne(AddressModel);




const BuildingModel = sequelize.models.Building;
module.exports = BuildingModel;