"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Follower extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Follower.belongsTo(models.User, { foreignKey: "UserId", as: "User" });
      Follower.belongsTo(models.User, {
        foreignKey: "UserFollowerId",
        as: "UserFollower",
      });
    }
  }
  Follower.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
      UserFollowerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Follower",
    }
  );
  return Follower;
};
