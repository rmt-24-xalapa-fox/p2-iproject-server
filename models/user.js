"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Poem, {
        foreignKey: "UserId",
      });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "email must not be null" },
          notEmpty: { msg: "email must not be empty" },
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "username must not be null" },
          notEmpty: { msg: "username must not be empty" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "password must not be null" },
          notEmpty: { msg: "password must not be empty" },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((instance, options) => {
    const hash = hashPassword(instance.password);
    instance.password = hash;
  });
  return User;
};
