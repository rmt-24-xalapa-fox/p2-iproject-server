"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class License extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      License.belongsTo(models.User, { foreignKey: "UserId" });
      License.belongsTo(models.Mountain, { foreignKey: "MountainId" });
    }
  }
  License.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "UserId cannot be null" },
          notEmpty: { msg: "UserId cannot be empty" },
        },
      },
      MountainId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "MountainId cannot be null" },
          notEmpty: { msg: "MountainId cannot be empty" },
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Status cannot be null" },
          notEmpty: { msg: "Status cannot be empty" },
        },
      },
    },
    {
      sequelize,
      modelName: "License",
      hooks: {
        beforeCreate: (license, option) => {
          license.status = "Waiting For Payment";
        },
      },
    }
  );
  return License;
};
