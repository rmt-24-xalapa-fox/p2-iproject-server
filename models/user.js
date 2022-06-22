'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.CardUser)
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          // args: true,
          msg: `Email can not be empty`
        },
        notNull: {
          // args: true,
          msg: `Email can not be Null`
        },
        isEmail: {
          // args: true,
          msg: `FIll email with true format`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          // args: true,
          msg: `password can not be empty`
        },
        notNull: {
          // args: true,
          msg: `password can not be Null`
        },

      }
    },
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    province: DataTypes.STRING,
    city: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(instance, options) {
        instance.password = hashPassword(instance.password)
        if (!instance.username) {
          instance.username = instance.email.split('@')[0]
        }
      }
    }
  });
  return User;
};