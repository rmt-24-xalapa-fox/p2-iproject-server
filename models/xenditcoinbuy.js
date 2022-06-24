'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class xenditcoinbuy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.CoinBuy, {
        foreignKey : "CoinbuyId"
      })
    }
  }
  xenditcoinbuy.init({
    CoinbuyId: DataTypes.INTEGER,
    xenditLink: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'xenditcoinbuy',
  });
  return xenditcoinbuy;
};