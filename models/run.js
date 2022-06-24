'use strict';
const {
  Model
} = require('sequelize');
const { User } = require("./user")
module.exports = (sequelize, DataTypes) => {
  class Run extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User)
      this.belongsToMany(models.Item, { through: models.RunItem, foreignKey: 'RunId' })
    }
  }
  Run.init({
    UserId: {
      type:DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      }
    },
    finalized: DataTypes.BOOLEAN,
    rounds: DataTypes.INTEGER,
    hp: DataTypes.INTEGER,
    level: DataTypes.INTEGER,
    money: DataTypes.INTEGER,
    transform: DataTypes.STRING,
    moves: DataTypes.STRING,
    map: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Run',
    hooks: {
      beforeCreate: (run, options) => {
        run.finalized = run.finalized ?? false
        run.rounds = run.rounds ?? 0
        run.hp = run.hp ?? 100
        run.level = run.level ?? 0
        run.money = run.money ?? 0
        run.createdAt = new Date()
        run.updatedAt = new Date()
      },
      beforeUpdate: (run, options) => {
        run.updatedAt = new Date()
      }
    }
  });
  return Run;
};