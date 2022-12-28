'use strict';
const {
  Model
} = require('sequelize');
const encryptPw = require("../helpers/encrpyt-pw");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Report, {foreignKey:`UploaderId`})
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {msg: `Incorrect email format`},
      validate: {
        notNull: { msg: `Email cannot be empty` },
        notEmpty: { msg: `Email cannot be empty` },
        isEmail: { msg: `Email must be in Email format` },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `Password cannot be empty` },
        notEmpty: { msg: `Password cannot be empty` },
      },
    },
    role: DataTypes.STRING,
    phoneNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user, options) {
        // console.log(user.password)
        user.password = encryptPw(user.password)

        // if(!user.role){
        //   user.role = `Admin`
        // }
      },
    },
  });
  return User;
};