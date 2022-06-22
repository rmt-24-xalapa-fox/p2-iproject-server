"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {
        foreignKey: "UserId",
      });
    }
  }
  Order.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "UserId is required" },
          notEmpty: { msg: "password is required" },
        },
      },
      books: {
        type: DataTypes.ARRAY,
        allowNull: false,
        validate: {
          notNull: { msg: "books is required" },
          notEmpty: { msg: "books is required" },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "price is required" },
          notEmpty: { msg: "price is required" },
        },
      },
      receivedDateMin: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: "receivedDateMin is required" },
          notEmpty: { msg: "receivedDateMin is required" },
        },
      },
      receivedDateMax: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: "receivedDateMax is required" },
          notEmpty: { msg: "receivedDateMax is required" },
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "status is required" },
          notEmpty: { msg: "status is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );

  Order.beforeCreate((instance, option) => {
    instance.status = "on process";
  });

  return Order;
};
