'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Player.belongsTo(models.Category, {
        foreignKey: "CategoryId"
      })
      Player.belongsTo(models.Position, {
        foreignKey: "PositionId"
      })
      Player.belongsTo(models.Team, {
        foreignKey: "TeamId"
      })
      Player.belongsToMany(models.User, {
        through: models.CardUser
      })
    }
  }
  Player.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          // args: true,
          message: `Name can not be empty`
        },
        notNull: {
          message: `Name can not be Null`
        },

      }
    },
    year: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          // args: true,
          message: `Year can not be empty`
        },
        notNull: {
          message: `Year can not be Null`
        },

      }
    },
    overall: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          // args: true,
          message: `Overall can not be empty`
        },
        notNull: {
          message: `Overall can not be Null`
        },

      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          // args: true,
          message: `Description can not be empty`
        },
        notNull: {
          message: `Description can not be Null`
        },

      }
    },
    imgUrl1: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          // args: true,
          message: `first imgURl can not be empty`
        },
        notNull: {
          message: `first imgURl can not be Null`
        },
      }
    },
    imgUrl2: DataTypes.STRING,
    imgUrl3: DataTypes.STRING,
    price: DataTypes.INTEGER,
    TeamId: DataTypes.INTEGER,
    PositionId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};