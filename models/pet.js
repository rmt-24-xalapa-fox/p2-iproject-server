"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Pet extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Pet.belongsTo(models.User, {
                foreignKey: "OwnerId",
                references: "id",
            });
        }
    }
    Pet.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: { msg: "Pet name cannot be empty" },
                    notNull: { msg: "Pet name cannot be null" },
                },
            },
            gender: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: { msg: "Pet name cannot be empty" },
                    notNull: { msg: "Pet name cannot be null" },
                },
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: { msg: "Pet name cannot be empty" },
                    notNull: { msg: "Pet name cannot be null" },
                },
            },
            size: DataTypes.STRING,
            primaryBreed: DataTypes.STRING,
            secondaryBreed: DataTypes.STRING,
            mixedBreed: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            unknownBreed: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            spayed: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            houseTrained: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            declawed: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            specialNeeds: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            shots: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            goodWithChildren: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            goodWithDogs: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            goodWithCats: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            imageUrl: DataTypes.STRING,
            description: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: "Pet",
        }
    );
    return Pet;
};
