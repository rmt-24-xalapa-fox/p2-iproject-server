"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ingredient.belongsToMany(models.Product, { through: "Recipes" });
    }
  }
  Ingredient.init(
    {
      name: DataTypes.STRING,
      stock: DataTypes.INTEGER,
      cost: DataTypes.INTEGER,
      unit: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: "Ingredient"
    }
  );
  return Ingredient;
};
