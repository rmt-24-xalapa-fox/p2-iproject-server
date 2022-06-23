'use strict';
const {
  Model
} = require('sequelize');
const { hashingPass } = require('../helpers/helper');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Favourite)
    }
  }
  User.init({
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Nickname can't be null"
        },
        notEmpty: {
          msg: "Nickname can't be empty"
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email address already in use!'
      },
      validate: {
        notNull: {
          msg: "Email can't be null"
        },
        notEmpty: {
          msg: "Email can't be empty"
        },
        isEmail: {
          msg: "Invalid email format"
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password can't be null"
        },
        notEmpty: {
          msg: "Password can't be empty"
        },
        len: { 
          args: [5, 20],
          msg: "The password length should be between 5 and 20 characters."
       }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((instance, options) => {
    instance.password = hashingPass(instance.password)
  })

  return User;
};