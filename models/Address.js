const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://s343056:a8x3u3Xyid768O1I@localhost:8933/studs');

const Address = sequelize.define('Address', {
    street: DataTypes.INTEGER,
    building_number: DataTypes.INTEGER
});

const AddressModel = sequelize.models.Address;
module.exports = AddressModel;