'use strict';
const {
  Model
} = require('sequelize');
const { hash } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Wishlist, {foreignKey: 'UserId'})
      User.hasMany(models.Cart, {foreignKey: 'UserId'})

    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        notEmpty: {msg:`Email is required`},
        notNull: {msg:`Email is required`},
        isEmail: {msg: `Invalid email format`}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {msg:`Password is required`},
        notNull: {msg:`Password is required`},
        len: {
          args: [5],
          msg: "Password should have at least 5 characters"
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {msg:`Username is required`},
        notNull: {msg:`Username is required`},
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks:{
      beforeCreate: (user, options) => {
        const hashedPassword = hash(user.password)
        user.password = hashedPassword
      }
    }
  });
  return User;
};