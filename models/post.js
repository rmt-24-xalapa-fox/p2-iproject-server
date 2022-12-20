"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Post.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
      },
      requestName: {
        type: DataTypes.STRING,
      },
      requestSeries: {
        type: DataTypes.STRING,
      },
      uploadImg: {
        type: DataTypes.STRING,
      },
      offerName: {
        type: DataTypes.STRING,
      },
      offerSeries: {
        type: DataTypes.STRING,
      },
      fetchedImg: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
