const { compareHash } = require('../helpers/bcrypt')
const nodemailer = require("nodemailer");
const { createToken } = require('../helpers/token')
const { User } = require('../models')

const CLIENT_GOOGLE = process.env.CLIENT_GOOGLE

// nodemailerneeds
let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    secureConnection: false,
    port: 587,
    auth: {
        user: "santosobudi410@outlook.com",
        pass: "DemiNodemailer212",
    },
});


class customerController {

    static async registerCustomer(req, res, next) {
        try {
            const { username, email, password, phoneNumber, address, province, city } = req.body
            const newUser = await User.create({
                username,
                email,
                password,
                phoneNumber,
                address,
                province,
                city
            })
            let mailOptions = {
                from: '"Cardbas" <santosobudi410@outlook.com>',
                to: newUser.email,
                subject: "Congratulations!",
                text: "Hello " + newUser.email + " Thanks for Register in Cardbas", // plain text body
                html:
                    "<b> Hello '" + newUser.email + "' Thanks for Register in Cardbas "

            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error, "Error from nodemailer");
                } else {
                    console.log("Sended!");
                }
            });

            res.status(201).json({
                statusCode: 201,
                message: 'Success Create data',
                data: {
                    id: newUser.id,
                    email: newUser.email
                }
            })
        }
        catch (err) {
            next(err)
        }
    }

    static async loginCustomer(req, res, next) {
        try {
            const { email, password } = req.body
            const logCust = await User.findOne({
                where: {
                    email
                }
            })
            if (!logCust) {
                throw new Error("passwordsalah")
            }
            const checkpw = compareHash(password, logCust.password)
            if (!checkpw) {
                throw new Error("passwordsalah")
            }
            const payload = {
                id: logCust.id,
                email: logCust.email
            }
            const token = createToken(payload)
            res.status(200).json({
                statusCode: 200,
                message: `Success Login`,
                access_token: token,
                data: {
                    id: logCust.id,
                    email: logCust.email,
                    username: logCust.username
                }
            })
        }
        catch (err) {
            next(err)
        }
    }

    static async googleSignCustomer(req, res, next) {
        try {
            const client = new OAuth2Client(CLIENT_GOOGLE);
            const ticket = await client.verifyIdToken({
                idToken: req.body.credential,
                audience: CLIENT_GOOGLE,
            });
            const payload = ticket.getPayload();

            let email = payload.email;
            let customer = await Customer.findOne({
                where: {
                    email,
                },
            });
            if (customer) {
                const payloadd = {
                    id: customer.id,
                    email: customer.email,

                }
                let access_token = createToken({
                    payloadd
                });
                res.status(200).json({
                    statusCode: 200,
                    message: `Login dengan google Success`,
                    access_token: access_token,
                    data_customer: payloadd
                });
            } else {
                let username = payload.name.split(" ").join("_");
                let customer = {
                    username,
                    email,
                    password: Math.random().toString(36).substring(1, 7),

                };
                customer = await Customer.create(customer, { hooks: false })
                const payloadd = {
                    id: customer.id,
                    email: customer.email,

                }
                let access_token = createToken(payloadd)
                res.status(201).json({
                    statusCode: 200,
                    message: `Register dengan google Success`,
                    access_token: access_token,
                    data_customer: payloadd
                })
            }
        } catch (error) {
            next(error);
        }

    }


}

module.exports = customerController