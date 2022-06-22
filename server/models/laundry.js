'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Laundry extends Model {
    
    static associate(models) {
      Laundry.belongsToMany(models.User, {through: models.User_Laundry})
    }
  }
  Laundry.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          message: "Name is required"
        },   
        notEmpty: {
          message: "Name is required"
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        message: "Email must be unique"
      },
      validate: {
        isEmail: {
          message: "Invalid email format"
        },
        notNull: {
          message: "Email is required"
        },   
        notEmpty: {
          message: "Email is required"
        },
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          message: "Phone is required"
        },   
        notEmpty: {
          message: "Phone is required"
        },
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          message: "Address is required"
        },   
        notEmpty: {
          message: "Address is required"
        },
      }
    },
    latitude: {
      type: DataTypes.STRING,
    },
    longitude: {
      type: DataTypes.STRING,
    },
    county: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          message: "County is required"
        },   
        notEmpty: {
          message: "County is required"
        },
      }
    },
    socialMedia: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          message: "Social Media is required"
        },   
        notEmpty: {
          message: "Social Media is required"
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Laundry',
  });
  return Laundry;
};