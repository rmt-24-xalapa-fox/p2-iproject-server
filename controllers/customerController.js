const { compareHash } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/token')
const nodemailer = require("nodemailer");
const { User } = require('../models')



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


}

module.exports = customerController

