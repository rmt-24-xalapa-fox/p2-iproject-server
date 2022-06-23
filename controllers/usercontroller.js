"use script";

const { User, Pet } = require("../models/index.js");
const { compare } = require("../helpers/bcrypt");
const { convertPayloadToToken } = require("../helpers/jwt");

class UserController {
    static async register(req, res, next) {
        try {
            const { username, email, password } = req.body;
            const newUser = await User.create({
                username,
                email,
                password,
            });

            res.status(201).json({
                statusCode: 201,
                message: "user succesfully created",
                data: { username: newUser.username, email: newUser.email },
            });
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({
                where: {
                    email: email,
                },
            });
            if (!user) {
                throw { code: 401 };
            }
            const PasswordCompare = compare(password, user.password);
            if (!PasswordCompare) {
                throw { code: 401 };
            }
            let payload = {
                id: user.id,
                email: user.email,
            };
            payload = convertPayloadToToken(payload);
            res.status(200).json({
                statusCode: 200,
                access_token: payload,
                username: user.username,
                email: user.email,
            });
        } catch (error) {
            next(error);
        }
    }

    static async getUserDetail(req, res, next) {
        try {
            let id = +req.params.id;
            const user = await User.findOne({
                attributes: {
                    where: {
                        id,
                    },
                    exclude: ["password", "createdAt", "updatedAt"],
                },
                include: {
                    model: Pet,
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                },
            });

            if (!user) {
                throw { code: 404 };
            }
            res.status(200).json({
                statusCode: 200,
                user: user,
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = UserController;
