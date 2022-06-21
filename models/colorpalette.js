"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ColorPalette extends Model {
    static associate(models) {
      ColorPalette.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  ColorPalette.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: `Pallete name can't be empty` },
          notEmpty: { msg: `Pallete name can't be empty` },
        },
      },
      colors: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        validate: {
          isArray(colors) {
            if (!Array.isArray(colors)) {
              throw new Error("Colors must be an Array");
            }
          },
          isHexCode(colors) {
            colors.forEach((color) => {
              const isColor = /^#[0-9a-f]{6}/i.test(color);
              if (!isColor) {
                throw new Error("Colors must be in hexcode format");
              }
            });
          },
          isFiveColors(colors) {
            if (colors.length !== 5) {
              throw new Error("Colors must consist of 5 colors");
            }
          },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "ColorPalette",
    }
  );
  return ColorPalette;
};
