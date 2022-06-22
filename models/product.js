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
      this.belongsToMany(models.User, {
        through: models.Cart,
      });
    }
  }
  Product.init({
    url: DataTypes.STRING,
    title: DataTypes.STRING,
    asin: DataTypes.STRING,
    price: DataTypes.STRING,
    brand: DataTypes.STRING,
    product_details: DataTypes.TEXT,
    breadcrumbs: DataTypes.STRING,
    images_list: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};