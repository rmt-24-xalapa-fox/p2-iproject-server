"use strict";
const { payToToken, tokenToPay } = require("../helpers/jwt");
const { hash, compare } = require("../helpers/bcrypt");
const { User, Product } = require("../models/index");

class UserController {
    static async register(req, res, next) {
        try {
            const { name, email, password } = req.body;
            let role = "Admin";
            const newUser = await User.create({
                name, email, password, role
            });
            res.status(201).json({
                id: newUser.id,
                email: newUser.email
            });
        } catch (err) {
            console.log(err);
            // next(err);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const foundUser = await User.findOne({
                where: {
                    email: email
                }
            });

            if (!foundUser) {
                throw { name: 'Not found user' };
            }

            const confirmedPassword = compare(password, foundUser.password);

            if (!confirmedPassword) {
                throw { name: 'Not found user' };
            }

            const sentPayload = {
                id: foundUser.id
            };

            const token = payToToken(sentPayload);

            res.status(200).json({
                access_token: token
            });
        } catch (err) {
            // next(err);
            console.log(err);
        }
    }

    static async createProduct(req, res, next) {
        try {
            const { name, description, price, imgUrl, stock } = req.body;
            const created = await Product.create({
                name, description, price, imgUrl, stock
            });
            res.status(201).json({
                created
            });
        } catch (err) {
            console.log(err);
        }
    }

    static async readAllProduct(req, res, next) {
        try {
            const allProduct = await Product.findAll();
            res.status(200).json({
                allProduct
            });
        } catch (err) {
            console.log(err);
        }
    }

    static async deleteProduct(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await Product.destroy({
                where: {
                    id: id
                }
            });
            res.status(200).json({
                msg: `Success delete product with id ${id}`
            });
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = UserController;