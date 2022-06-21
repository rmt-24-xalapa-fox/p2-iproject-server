"use strict";

const { User } = require("../models/index");
const { verifyPassword, addToken } = require("../helpers");
const { OAuth2Client } = require("google-auth-library");
const { CLIENT_ID } = process.env;

class userController {
    static async googleSignIn(req, res, next) {
        try {
            const client = new OAuth2Client(CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken: req.body.credential,
                audience: CLIENT_ID,
            });
            const payload = ticket.getPayload();

            let email = payload.email;
            let user = await User.findOne({
                where: {
                    email,
                },
            });
            if (user) {
                let accessToken = addToken({
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    role: user.role,
                });
                res.status(200).json({
                    accessToken,
                    email: user.email,
                    username: user.username,
                    role: user.role,
                });
            } else {
                let username = payload.name.split(" ").join("_");
                let user = {
                    username,
                    email,
                    password: "Goggle Sign In",
                    role: "staff",
                };
                user = await User.create(user, { hooks: false })

                accessToken = addToken({
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    role: user.role,
                })
                res.status(201).json({
                    message: "User Created Succesfully",
                    accessToken,
                    email,
                    role,
                    username
                })
            }
        } catch (error) {
            next(error);
        }
    }

    static async userCreate(req, res, next) {
        try {
            const { username, email, password, phoneNumber, address } = req.body;
            const createUser = await User.create({
                username,
                email,
                password,
                role: "admin",
                phoneNumber,
                address,
            });
            res.status(200).json({
                statusCode: 200,
                data: createUser,
            });
        } catch (err) {
            next(err);
        }
    }

    static async userLogin(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email) {
                throw new Error("Email cannot be null");
            }
            if (!password) {
                throw new Error("Password cannot be null");
            }

            const foundUser = await User.findOne({
                where: {
                    email,
                },
            });

            if (!foundUser) {
                throw new Error("User not found");
            }
            const comparePassword = verifyPassword(password, foundUser.password);

            if (!comparePassword) {
                throw new Error("User not found");
            }

            const payloadUser = {
                id: foundUser.id,
                username: foundUser.username,
                email: foundUser.email,
                role: foundUser.role,
            };

            const tokenUser = addToken(payloadUser);
            res.status(200).json({
                statusCode: 200,
                data: {
                    accessToken: tokenUser,
                    userId: foundUser.id,
                    email: foundUser.email,
                    username: foundUser.username,
                    role: foundUser.role,

                },
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
}

module.exports = { userController };
