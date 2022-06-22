"use strict";
const { Model } = require("sequelize");
const { hasPasswrd } = require("../helper/helper");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Tour, { through: models.Transaction });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "username is required" },
          notNull: { msg: "username is required" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "username is required" },
          notNull: { msg: "username is required" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "password is required" },
          notNull: { msg: "password is required" },
        },
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "phone number is required" },
          notNull: { msg: "phone number is required" },
        },
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: { msg: "address is required" },
          notNull: { msg: "address is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate(ins) {
          ins.password = hasPasswrd(ins.password);
        },
      },
    }
  );
  return User;
};
