'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
   
    static associate(models) {
      User.belongsToMany(models.Laundry, {through: models.User_Laundry})

    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          message: "Username is required"
        },   
        notEmpty: {
          message: "Username is required"
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        message: "Email must be unique"
      },
      validate: {
        isEmail: {
          message: "Invalid email format"
        },
        notNull: {
          message: "Email is required"
        },   
        notEmpty: {
          message: "Email is required"
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          message: "Password is required"
        },   
        notEmpty: {
          message: "Password is required"
        },
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(async (user, options) => {
    user.password = hashPassword(user.password)
  });

  return User;
};