'use strict';
const {
  Model
} = require('sequelize');

const { hash } = require("../helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.belongsToMany(models.Product, {
        through: models.Cart,
      });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Email address already in use!",
        },
        validate: {
          notNull: {
            msg: "email is required!",
          },
          notEmpty: {
            msg: "email is required!",
          },
          isEmail: {
            msg: "email must be email format!",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "password is required!",
          },
          notEmpty: {
            msg: "password is required!",
          },
          minPw(value) {
            if (this.password.length < 5) {
              throw new Error("Password must be greater than 5 character!");
            }
          },
        },
      },
      phoneNumber: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((instance, options) => {
    instance.password = hash(instance.password);
  });
  return User;
};