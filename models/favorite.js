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
      // define association here
      Favorite.belongsTo(models.Customer, {foreignKey:"CustomerId"})
      Favorite.belongsTo(models.Novel, {foreignKey:"NovelId"})
    }
  }
  Favorite.init({
    CustomerId: DataTypes.INTEGER,
    NovelId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Favorite',
  });
  return Favorite;
};