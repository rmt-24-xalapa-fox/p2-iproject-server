"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Item.hasMany(models.Build, {
        foreignKey: "Item1Id",
      });
      Item.hasMany(models.Build, {
        foreignKey: "Item2Id",
      });
      Item.hasMany(models.Build, {
        foreignKey: "Item3Id",
      });
      Item.hasMany(models.Build, {
        foreignKey: "Item4Id",
      });
      Item.hasMany(models.Build, {
        foreignKey: "Item5Id",
      });
      Item.hasMany(models.Build, {
        foreignKey: "Item6Id",
      });
      Item.hasMany(models.Build, {
        foreignKey: "Item7Id",
      });
    }
  }
  Item.init(
    {
      name: DataTypes.STRING,
      imgUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Item",
    }
  );
  return Item;
};
