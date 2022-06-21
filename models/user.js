"use strict";
const { Model } = require("sequelize");
const { hash } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {}
    }
    User.init(
        {
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: { msg: "Username cannot be empty" },
                    notNull: { msg: "Username cannot be null" },
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: { msg: "please insert a valid E-mail address." },
                    notEmpty: { msg: "Username cannot be empty" },
                    notNull: { msg: "Username cannot be null" },
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: { msg: "Username cannot be empty" },
                    notNull: { msg: "Username cannot be null" },
                    len: { args: [8], msg: "password must be atleast 8 characters long" },
                },
            },
            imageUrl: DataTypes.STRING,
        },
        {
            hooks: {
                beforeCreate(instance, options) {
                    instance.password = hash(instance.password);
                },
            },
            sequelize,
            modelName: "User",
        }
    );
    return User;
};
