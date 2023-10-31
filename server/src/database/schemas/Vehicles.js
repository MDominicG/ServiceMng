const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../db");

const Vehicles = sequelize.define("vehicles", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  clientId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vehiclePlate: {
    type: DataTypes.STRING,
    allowNull: false,
    lowercase: true,
  },
  vehicleVIN: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vehicleMake: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vehicleModel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vehicleYear: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vehiclePower: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vehicleGas: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vehicleCapacity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vehicleOdometer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vehicleTask: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  vehicleRecomTask: {
    type: DataTypes.JSON,
    allowNull: true
  },
  vehicleEnterDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
  vehicleDocuments:{
    type: DataTypes.TEXT,
    allowNull: true,
  },
  vehicleStatus:{
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: "1"
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
});

module.exports = Vehicles;
