"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Product.hasMany(models.Sale, { foreignKey: "ProductId" });
      // Product.belongsToMany(models.Ingredient, { through: "Recipes" });
      // Product.belongsTo(models.Category, {
      //   foreignKey: "CategoryId"
      // });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      imgUrl: DataTypes.STRING,
      price: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: "Product"
    }
  );
  return Product;
};
