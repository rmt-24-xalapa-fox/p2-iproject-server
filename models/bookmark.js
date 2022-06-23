'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bookmark.belongsTo(models.Customer);
      Bookmark.belongsTo(models.Product);
    }
  }
  Bookmark.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Name is required" },
        notEmpty: { msg: "Name is required" }
      }
    },
    CustomerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "CustomerId is required" },
        notEmpty: { msg: "CustomerId is required" }
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "ProductId is required" },
        notEmpty: { msg: "ProductId is required" }
      }
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Quantity is required" },
        notEmpty: { msg: "Quantity is required" }
      }
    },
    qty: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Status is required" },
        notEmpty: { msg: "Status is required" }
      }
    }
  }, {
    sequelize,
    modelName: 'Bookmark',
  });
  return Bookmark;
};