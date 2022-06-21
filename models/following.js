"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Following extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Following.belongsTo(models.User, { foreignKey: "UserId", as: "User" });
      Following.belongsTo(models.User, {
        foreignKey: "UserFollowingId",
        as: "UserFollowing",
      });
    }
  }
  Following.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
      UserFollowingId: {
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
      modelName: "Following",
    }
  );
  return Following;
};
