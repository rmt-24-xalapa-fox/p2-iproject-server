"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Quota extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Quota.hasMany(models.License, { foreignKey: "QuotaId" });
      Quota.belongsTo(models.Mountain, { foreignKey: "MountainId" });
    }
  }
  Quota.init(
    {
      MountainId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "MountainId cannot be null" },
          notEmpty: { msg: "MountainId cannot be empty" },
        },
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: "Date cannot be null" },
          notEmpty: { msg: "Date cannot be empty" },
        },
      },
      quotaUse: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "QuotaUse cannot be null" },
          notEmpty: { msg: "QuotaUse cannot be empty" },
        },
      },
      quotaMax: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "QoutaMax cannot be null" },
          notEmpty: { msg: "QoutaMax cannot be empty" },
        },
      },
    },
    {
      sequelize,
      modelName: "Quota",
    }
  );
  return Quota;
};
