'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(models.Player, {
        foreignKey: "CategoryId"
      })
    }
  }
  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          message: `Category can not be empty`
        },
        notNull: {
          message: `Category can not be Null`
        },

      }
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};