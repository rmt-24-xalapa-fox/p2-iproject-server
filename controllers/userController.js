'use strict'
const { comparePass } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')
const { User } = require('../models/index')
const { OAuth2Client } = require('google-auth-library');
const { CLIENT_ID } = process.env
const nodemailer = require("nodemailer");

class UserController {
    static async googleLogin(req, res, next) {
        try {

        } catch (error) {
            console.log(error);
        }
    } static async googleLogin(req, res, next) {
        try {
            const idToken = req.body.credential
            const audience = CLIENT_ID
            const client = new OAuth2Client(CLIENT_ID);

            const ticket = await client.verifyIdToken({
                idToken,
                audience
            });

            const payload = ticket.getPayload();
            const [user, created] = await User.findOrCreate({
                where: { email: payload.email },
                defaults: {
                    username: 'public',
                    password: "google-signin",
                }
            })

            const data = {
                id: user.id,
                email: user.email,
                role: user.role,
            }

            const access_token = createToken(data)

            console.log('masoookkk')
            res.status(200).json({
                statusCode: 200,
                message: `Wellcome `,
                access_token,
            })

        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async register(req, res, next) {
        try {
            const { email, password } = req.body

            let transporter = nodemailer.createTransport({
                service: "hotmail",
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD,
                },
            });
            let mailOptions = {
                from: "redmarvel24@outlook.com",
                to: email,
                subject: "Register Success",
                text: 'Congratulations! You have successfully register on our Platform! Start browsing comics that you wanna see the details~`',
            };
            transporter.sendMail(mailOptions, function (err, succes) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Email is sent");
                }
            });

            const user_register = await User.create({
                email, password
            })

            res.status(201).json({
                statusCode: 201,
                message: "Account has been created",
            })

        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            const checkAccount = await User.findOne({
                where: { email }
            })

            if (!checkAccount) {
                throw ({ name: 'USER NOT FOUND' })
            }

            const checkPassword = comparePass(password, checkAccount.password)

            if (!checkPassword) {
                throw ({ name: 'USER NOT FOUND' })
            }

            const payload = {
                id: checkAccount.id,
                email: checkAccount.email,
            }

            const access_token = createToken(payload)

            res.status(200).json({
                access_token
            })

        } catch (error) {
            console.log(error);
            next(error)
        }
    }



}

module.exports = UserController
