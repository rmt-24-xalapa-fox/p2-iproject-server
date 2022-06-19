"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sale extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Sale.belongsTo(models.Product, { foreignKey: "ProductId" });
    }
  }
  Sale.init(
    {
      quantity: DataTypes.INTEGER,
      sales: DataTypes.INTEGER,
      cost: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: "Sale"
    }
  );
  return Sale;
};
