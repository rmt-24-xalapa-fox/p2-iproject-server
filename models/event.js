'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.belongsToMany(models.User, { through: models.MyEvent });
      Event.hasMany(models.MyEvent)
    }
  }
  Event.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    status: DataTypes.STRING,
    location: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    date: DataTypes.DATE,
    time: DataTypes.STRING,
    description: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    author: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};