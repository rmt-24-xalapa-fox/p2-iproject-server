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
      this.belongsTo(models.Customer, {foreignKey: 'CustomerId'})
      this.belongsTo(models.Barber, {foreignKey: 'BarberId'})

      // define association here
    }
  }
  Transaction.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    CustomerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'CustomerId should not be empty'},
        notNull: { msg: 'CustomerId should not be empty'},
      }
    },
    BarberId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'BarberId should not be empty'},
        notNull: { msg: 'BarberId should not be empty'},
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Status should not be empty'},
        notNull: { msg: 'Status should not be empty'},
      }
    },
    day: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Day should not be empty'},
        notNull: { msg: 'Day should not be empty'},
      }
    },
    note: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Note should not be empty'},
        notNull: { msg: 'Note should not be empty'},
      }
    },
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};