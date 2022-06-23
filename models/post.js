'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.PostFavourite);
      this.hasMany(models.PostComment);
      this.belongsTo(models.User, {
        foreignKey : "UserId"
      });
    }
  }
  Post.init({
    title: DataTypes.STRING,
    media: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};