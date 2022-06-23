'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MyEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MyEvent.belongsTo(models.User);
      MyEvent.belongsTo(models.Event);
    }
  }
  MyEvent.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    UserId: DataTypes.INTEGER,
    EventId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MyEvent',
  });
  return MyEvent;
};