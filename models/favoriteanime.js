'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FavoriteAnime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     FavoriteAnime.belongsTo(models.User)
    }
  }
  FavoriteAnime.init({
    animeId: DataTypes.STRING,
    title: DataTypes.STRING,
    currentEpisode: DataTypes.INTEGER,
    totalEpisode: DataTypes.INTEGER,
    imgUrl: DataTypes.STRING,
    animeUrl: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FavoriteAnime',
  });
  return FavoriteAnime;
};