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
      User.hasMany(models.Poem, {
        foreignKey: "UserId",
      });
    }
  }
  User.init(
    {
      email: {
        TYPE: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "email must not be null" },
          notEmpty: { msg: "email must not be empty" },
        },
      },
      username: {
        TYPE: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "username must not be null" },
          notEmpty: { msg: "username must not be empty" },
        },
      },
      password: {
        TYPE: DataTypes.STRING,
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
  return User;
};
