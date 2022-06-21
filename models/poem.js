"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Poem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Poem.belongsTo(models.User, {
        foreignKey: "UserId",
      });
    }
  }
  Poem.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "fields must not be null" },
          notEmpty: { msg: "fields must not be empty" },
        },
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "fields must not be null" },
          notEmpty: { msg: "fields must not be empty" },
        },
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "fields must not be null" },
          notEmpty: { msg: "fields must not be empty" },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "fields must not be null" },
          notEmpty: { msg: "fields must not be empty" },
        },
      },
    },
    {
      sequelize,
      modelName: "Poem",
    }
  );
  return Poem;
};
