const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://s343056:a8x3u3Xyid768O1I@localhost:8933/studs');

const Step = sequelize.define('Step', {
    title: DataTypes.STRING,
    address: DataTypes.STRING,
    photos: DataTypes.ARRAY(DataTypes.STRING),
    description: DataTypes.STRING,
    openingTime: DataTypes.STRING,
    closingTime: DataTypes.STRING,
    category: DataTypes.STRING,
});

const StepModel = sequelize.models.Step;
module.exports =StepModel;