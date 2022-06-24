'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GiftingHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GiftingHistory.init({
    WalletTargetId: DataTypes.INTEGER,
    WalletGiverId: DataTypes.INTEGER,
    coin: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'GiftingHistory',
  });
  return GiftingHistory;
};