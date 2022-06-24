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
      License.belongsTo(models.Quota, { foreignKey: "QuotaId" });
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
      QuotaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "QuotaId cannot be null" },
          notEmpty: { msg: "QuotaId cannot be empty" },
        },
      },
      numberOfClimbers: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "NumberOfClimbers cannot be null" },
          notEmpty: { msg: "NumberOfClimbers cannot be empty" },
        },
      },
      totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "totalPrice cannot be null" },
          notEmpty: { msg: "totalPrice cannot be empty" },
        },
      },
      status: DataTypes.STRING,
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
