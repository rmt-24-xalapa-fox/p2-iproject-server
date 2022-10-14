'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CoinPrice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.CoinBuy);
    }
  }
  CoinPrice.init({
    coinAmmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Coin ammount cannot be empty"
        },
        notEmpty: {
          msg: "Coin ammount  cannot be empty"
        },
        min:1
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Price cannot be empty"
        },
        notEmpty: {
          msg: "Price cannot be empty"
        },
        min:1
      }
    },
  }, {
    sequelize,
    modelName: 'CoinPrice',
  });
  return CoinPrice;
};