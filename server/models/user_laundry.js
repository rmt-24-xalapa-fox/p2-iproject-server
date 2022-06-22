"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_Laundry extends Model {
    static associate(models) {
      User_Laundry.belongsTo(models.User);
      User_Laundry.belongsTo(models.Laundry);
    }
  }
  User_Laundry.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      UserId: DataTypes.INTEGER,
      LaundryId: DataTypes.INTEGER,
      service: DataTypes.STRING,
      kg: DataTypes.INTEGER,
      cost: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User_Laundry",
    }
  );

  User_Laundry.beforeCreate(async (order, options) => {
    order.status = "waiting for payment"
  });
  return User_Laundry;
};
