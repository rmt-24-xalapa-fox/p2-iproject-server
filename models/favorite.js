'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
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
  Favorite.init({
    CustomerId: DataTypes.INTEGER,
    BarberId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Favorite',
  });
  return Favorite;
};