"use strict";
const { Model } = require("sequelize");
const { encryptPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.ColorPalette, { foreignKey: "UserId" });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: `Name can't be empty` },
          notEmpty: { msg: `Name can't be empty` },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: `Email can't be empty` },
          notEmpty: { msg: `Email can't be empty` },
          isEmail: { msg: "Email must be in email format" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: `Password can't be empty` },
          notEmpty: { msg: `Password can't be empty` },
        },
      },
      plan: {
        type: DataTypes.STRING,
      },
      profilePicture: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((user, options) => {
    if (!user.plan) {
      user.plan = "Free";
    }
    if (!user.profilePicture) {
      user.profilePicture = `https://avatars.dicebear.com/api/identicon/${user.name}.png`;
    }
    user.password = encryptPassword(user.password);
  });
  User.beforeUpdate((user, options) => {
    user.password = encryptPassword(user.password);
  });
  return User;
};
