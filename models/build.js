'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Build extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Build.init({
    UserId: DataTypes.INTEGER,
    HeroId: DataTypes.INTEGER,
    Item1Id: DataTypes.INTEGER,
    Item2Id: DataTypes.INTEGER,
    Item3Id: DataTypes.INTEGER,
    Item4Id: DataTypes.INTEGER,
    Item5Id: DataTypes.INTEGER,
    Item6Id: DataTypes.INTEGER,
    Item7Id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Build',
  });
  return Build;
};