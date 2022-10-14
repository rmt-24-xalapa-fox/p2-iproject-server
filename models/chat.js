'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey : "PosterId"
      });
      this.belongsTo(models.ChatRoom, {
        foreignKey : "ChatRoomId"
      });
    }
  }
  Chat.init({
    ChatRoomId: DataTypes.INTEGER,
    PosterId: DataTypes.INTEGER,
    chat: DataTypes.TEXT,
    media: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};