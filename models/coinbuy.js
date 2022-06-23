'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CoinBuy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Wallet, {
        foreignKey : "WalletId"
      });
      this.belongsTo(models.CoinPrice, {
        foreignKey : "CoinId"
      });
      
    }
  }
  CoinBuy.init({
    WalletId: DataTypes.INTEGER,
    CoinId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CoinBuy',
  });
  return CoinBuy;
};