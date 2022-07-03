"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Mountain extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Mountain.hasMany(models.License, { foreignKey: "MountainId" });
      Mountain.hasMany(models.Quota, { foreignKey: "MountainId" });
    }
  }
  Mountain.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Name cannot be null" },
          notEmpty: { msg: "Name cannot be empty" },
        },
      },
      height: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Height cannot be null" },
          notEmpty: { msg: "Height cannot be empty" },
        },
      },
      imageUrl: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: "ImageUrl cannot be null" },
          notEmpty: { msg: "ImageUrl cannot be empty" },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: "Description cannot be null" },
          notEmpty: { msg: "Description cannot be empty" },
        },
      },
      licenseCost: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "License Cost cannot be null" },
          notEmpty: { msg: "License Cost cannot be empty" },
        },
      },
    },
    {
      sequelize,
      modelName: "Mountain",
    }
  );
  return Mountain;
};
