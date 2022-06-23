'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Bookmark);
      Product.belongsToMany(models.Customer, { through: "models.Bookmark" });
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Name is required" },
        notEmpty: { msg: "Name is required" }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: "Description is required" },
        notEmpty: { msg: "Description is required" }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Price is required" },
        notEmpty: { msg: "Price is required" }
      }
    },
    imgUrl: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "ImgUrl is required" },
        notEmpty: { msg: "ImgUrl is required" }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Stock is required" },
        notEmpty: { msg: "Stock is required" }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};