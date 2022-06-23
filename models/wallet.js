'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.CoinBuy);
      this.belongsTo(models.User, {
        foreignKey : "UserId"
      });
    }
  }
  Wallet.init({
    UserId: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN,
    coin: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Wallet',
  });
  return Wallet;
};