'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User, { foreignKey: "UserId" });
      Transaction.belongsTo(models.Price, { foreignKey: "PriceId" });
    }
  }
  Transaction.init({
    UserId: DataTypes.INTEGER,
    PriceId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    MovieId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
    hooks: {
      beforeCreate: (transaction) => {
        transaction.status = "pending";
      },
    },
  });
  return Transaction;
};