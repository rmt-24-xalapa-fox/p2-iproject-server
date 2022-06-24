'use strict';
const {
  Model
} = require('sequelize');
const { hasPassword } = require('../helpers/bcrypt');
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
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Email has been taken'
      },
      validate: {
        isEmail: {
          msg: "Invalid email format"
        },
        notEmpty: {
          msg: "Email is required"
        },
        notNull: {
          msg: "Email is required"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password is required"
        },
        notNull: {
          msg: "Password is required"
        },
        len: {
          args: 5,
          msg: "Password must be at least 5 characters"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((instance, options) => {
    instance.password = hasPassword(instance.password)
  })
  return User;
};