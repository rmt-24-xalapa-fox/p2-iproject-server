"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Wishlist.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  Wishlist.init(
    {
      UserId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      productName: {
        type: DataTypes.STRING,
      },
      productBrand: {
        type: DataTypes.STRING,
      },
      productPrice: {
        type: DataTypes.STRING,
      },
      productImage: {
        type: DataTypes.STRING,
      },
      productDescription: {
        type: DataTypes.STRING,
      },
      productCategory: {
        type: DataTypes.STRING,
      },
      productType: {
        type: DataTypes.STRING,
      },
      productTags: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      productColors: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
    },
    {
      sequelize,
      modelName: "Wishlist",
    }
  );
  return Wishlist;
};
