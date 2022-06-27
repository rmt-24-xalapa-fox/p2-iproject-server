"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Email cannot be empty" },
          notEmpty: { msg: "Email cannot be empty" },
          isEmail: { msg: "You must use a valid email" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Password cannot be empty" },
          notEmpty: { msg: "Password cannot be empty" },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Name cannot be empty" },
          notEmpty: { msg: "Name cannot be empty" },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
