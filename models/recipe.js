"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Recipe.belongsTo(models.Product, {
        foreignKey: "ProductId"
      });
      Recipe.belongsTo(models.Ingredient, {
        foreignKey: "IngredientId"
      });
    }
  }
  Recipe.init(
    {
      measurement: DataTypes.INTEGER,
      IngredientId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Ingredients",
          key: "id"
        }
      },
      ProductId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Products",
          key: "id"
        }
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: "Recipe"
    }
  );
  return Recipe;
};
