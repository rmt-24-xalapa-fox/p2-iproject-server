'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Position extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Position.hasMany(models.Player, {
        foreignKey: "PositionId"
      })
    }
  }
  Position.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          message: `position can not be empty`
        },
        notNull: {
          message: `position can not be Null`
        },

      }
    }
  }, {
    sequelize,
    modelName: 'Position',
  });
  return Position;
};