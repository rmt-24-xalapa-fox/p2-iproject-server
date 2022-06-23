'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: `UploaderId` });
    }
  }
  Report.init({
    imageUrl: DataTypes.STRING,
    description: DataTypes.TEXT,
    latitude: DataTypes.DECIMAL,
    longitude: DataTypes.DECIMAL,
    UploaderId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    respMessage: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Report',
    hooks: {
      beforeCreate(instance, options) {
        instance.status = `Waiting for confirmation`;
        instance.respMessage = `No message from Administrator yet`
      },
    },
  });
  return Report;
};