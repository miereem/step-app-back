const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://s343056:a8x3u3Xyid768O1I@localhost:8933/studs');
const AddressModel = require("./Address");

const Place = sequelize.define('Place', {
    owner: DataTypes.INTEGER,
    title: DataTypes.STRING,
    address: DataTypes.STRING,
    photos: DataTypes.ARRAY(DataTypes.STRING),
    description: DataTypes.STRING,
    openingTime: DataTypes.STRING,
    closingTime: DataTypes.STRING,
    //category: DataTypes.NUMBER,
});

//Place.hasOne(AddressModel);




const PlaceModel = sequelize.models.Place;
module.exports = PlaceModel;