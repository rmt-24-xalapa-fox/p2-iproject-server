'use strict';
const {
  Model
} = require('sequelize');
const { Run, Item } = require("./index")
module.exports = (sequelize, DataTypes) => {
  class RunItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RunItem.init({
    RunId: {
      type:DataTypes.INTEGER,
      references: {
        model: Run,
        key: "id"
      }
    },
    ItemId: {
      type:DataTypes.INTEGER,
      references: {
        model: Item,
        key: "id"
      }
    },
    stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RunItem',
  });
  return RunItem;
};