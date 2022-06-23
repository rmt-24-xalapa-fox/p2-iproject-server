'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favourite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Favourite.belongsTo(models.User)
    }
  }
  Favourite.init({
    title: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "Can't be same"
      },
    },
    imageUrl: DataTypes.STRING,
    vote: DataTypes.INTEGER,
    release: DataTypes.STRING,
    genre: DataTypes.STRING,
    movieId: {
      type: DataTypes.INTEGER,
      unique: {
        args: true,
        msg: "Can't be same"
      },
    },
    UserId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Favourite',
  });
  return Favourite;
};