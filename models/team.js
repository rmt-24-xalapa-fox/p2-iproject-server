'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Team.hasMany(models.Player, {
        foreignKey: "TeamId"
      })
    }
  }
  Team.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          message: `NBA team's name can not be empty`
        },
        notNull: {
          message: `NBA team's name can not be Null`
        },

      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          message: `Image Logo Team can not be empty`
        },
        notNull: {
          message: `Image Logo Team can not be Null`
        },

      }
    }
  }, {
    sequelize,
    modelName: 'Team',
  });
  return Team;
};