'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Run)
    }
  }
  User.init({
    email: {
      type:DataTypes.STRING,
      unique: true,
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, options) => {
        const { generatePW } = require("../helpers/cryptpw")        
        user. password = generatePW(user.password);
        user.createdAt = new Date()
        user.updatedAt = new Date()
      },
    }
  });
  return User;
};