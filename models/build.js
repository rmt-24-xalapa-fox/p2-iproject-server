"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Build extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Build.belongsTo(models.User, {
        foreignKey: "UserId",
      });
      Build.belongsTo(models.Hero, {
        foreignKey: "HeroId",
      });
      Build.belongsTo(models.Item, {
        foreignKey: "Item1Id",
      });
      Build.belongsTo(models.Item, {
        foreignKey: "Item2Id",
      });
      Build.belongsTo(models.Item, {
        foreignKey: "Item3Id",
      });
      Build.belongsTo(models.Item, {
        foreignKey: "Item4Id",
      });
      Build.belongsTo(models.Item, {
        foreignKey: "Item5Id",
      });
      Build.belongsTo(models.Item, {
        foreignKey: "Item6Id",
      });
      Build.belongsTo(models.Item, {
        foreignKey: "Item7Id",
      });
    }
  }
  Build.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "User ID is required",
          },
          notEmpty: {
            msg: "User ID is required",
          },
        },
      },
      HeroId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Hero ID is required",
          },
          notEmpty: {
            msg: "Hero ID is required",
          },
        },
      },
      Item1Id: DataTypes.INTEGER,
      Item2Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Item ID is required",
          },
          notEmpty: {
            msg: "Item ID is required",
          },
        },
      },
      Item3Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Item ID is required",
          },
          notEmpty: {
            msg: "Item ID is required",
          },
        },
      },
      Item4Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Item ID is required",
          },
          notEmpty: {
            msg: "Item ID is required",
          },
        },
      },
      Item5Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Item ID is required",
          },
          notEmpty: {
            msg: "Item ID is required",
          },
        },
      },
      Item6Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Item ID is required",
          },
          notEmpty: {
            msg: "Item ID is required",
          },
        },
      },
      Item7Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Item ID is required",
          },
          notEmpty: {
            msg: "Item ID is required",
          },
        },
      },
      vote: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Build",
    }
  );
  return Build;
};
