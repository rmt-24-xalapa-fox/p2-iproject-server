'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Novel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Novel.belongsTo(models.Staff, {foreignKey: "staffId"})
      Novel.belongsTo(models.Genre, {foreignKey: "genreId"})
      Novel.hasMany(models.Favorite, {
        foreignKey: "NovelId"
      })
    }
  }
  Novel.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Title is required"
        },
        notEmpty: {
          msg: "Title is required"
        }
      }
    },
    synopsis: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Synopsis is required"
        },
        notEmpty: {
          msg: "Synopsis is required"
        }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "ImageUrl is required"
        },
        notEmpty: {
          msg: "ImageUrl is required"
        }
      }
    },
    releaseDate: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "ReleaseDate is required"
        },
        notEmpty: {
          msg: "ReleaseDate is required"
        }
      }
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Price is required"
        },
        notEmpty: {
          msg: "Price is required"
        }
      }
    },
    staffId: DataTypes.INTEGER,
    genreId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Novel',
  });
  return Novel;
};