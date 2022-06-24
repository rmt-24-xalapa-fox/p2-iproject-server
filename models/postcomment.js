'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Comment, {
        foreignKey : "CommentId"
      });
      this.belongsTo(models.Post, {
        foreignKey : "PostId"
      });
    }
  }
  PostComment.init({
    CommentId: DataTypes.INTEGER,
    PostId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PostComment',
  });
  return PostComment;
};