'use strict';
const {
  Model
} = require('sequelize');
const {bcryptHashSync} = require('../helpers/bcrypt.js')
module.exports = (sequelize, DataTypes) => {
  class Barber extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Customer, {
        through: models.Transaction,
        foreignKey: 'BarberId'
      })
      this.belongsToMany(models.Customer, {
        through: models.Favorite,
        foreignKey: 'BarberId'
      })
      this.hasMany(models.Favorite, {foreignKey: 'BarberId'})
    }
  }
  Barber.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Email is empty" },
        notNull: { msg: "Email is null" },
        isEmail: { msg: "Email has to be in email format" },
      },
      unique: {
        msg: "Email must be unique"
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Password is empty" },
        notNull: { msg: "Password is null" },
        len: {
          args: [5],
          msg: "Password has to be more than 5 characters"
        }
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Name should not be empty'},
        notNull: { msg: 'Name should not be empty'},
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Price should not be empty'},
        notNull: { msg: 'Price should not be empty'},
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Location should not be empty'},
        notNull: { msg: 'Location should not be empty'},
      }
    },
    profile_image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Image should not be empty'},
        notNull: { msg: 'Image should not be empty'},
      }
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Rating should not be empty'},
        notNull: { msg: 'Rating should not be empty'},
      }
    },
    ratingCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'ratingCount should not be empty'},
        notNull: { msg: 'ratingCount should not be empty'},
      }
    },
  }, {
    sequelize,
    modelName: 'Barber',
  });
  Barber.beforeCreate((instance, options) => {
    const hash = bcryptHashSync(instance.password)
    instance.password = hash
  })
  return Barber;
};