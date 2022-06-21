"use strict";
const { bcryptPass } = require("../helpers/bcrypt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.License, { foreignKey: "UserId" });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Email must be unique" },
        validate: {
          notNull: { msg: "Email cannot be null" },
          notEmpty: { msg: "Email cannot be empty" },
          isEmail: { msg: "Email must be format email" },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Name cannot be null" },
          notEmpty: { msg: "Name cannot be empty" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Password cannot be null" },
          notEmpty: { msg: "Password cannot be empty" },
          minimumlength(password) {
            let lengthPass = password.length;
            if (lengthPass < 5) {
              throw new Error("Password minimal 5 word");
            }
          },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Phone Number cannot be null" },
          notEmpty: { msg: "Phone Number cannot be empty" },
        },
      },
      numberOfClimbers: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Number Of Climbers cannot be null" },
          notEmpty: { msg: "Number Of Climbers cannot be empty" },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: (user, option) => {
          let decryptPass = bcryptPass(user.password);
          user.password = decryptPass;
        },
      },
    }
  );
  return User;
};
