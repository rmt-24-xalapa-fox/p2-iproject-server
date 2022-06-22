'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Run, { through: models.RunItem, foreignKey: 'ItemId' })
    }
  }
  Item.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    limit: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    heal: DataTypes.STRING,
    img: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Item',
    hooks: {
      beforeCreate: (item, options) => {
        item.createdAt = new Date()
        item.updatedAt = new Date()
      },
    }
  });
  return Item;
};