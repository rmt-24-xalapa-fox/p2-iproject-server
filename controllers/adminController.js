const bcrypt = require("bcryptjs/dist/bcrypt");
const comparePw = require("../helpers/compare-pw");
const { convertPayloadToToken } = require("../helpers/jwt");
const { User, Report } = require("../models");
// const { OAuth2Client } = require("google-auth-library");
// const  CLIENT_ID  = process.env.CLIENT_ID;
// const  QR_API  = process.env.QR_API;
const { Op } = require("sequelize");
// const { transporter } = require("../helpers/nodemailer");
// const axios = require(`axios`)
const BASE_URL = `http://localhost:8080/`


class adminController {
    static async register(req, res, next) {
        try {
            const { email, password } = req.body;
            const newUser = await User.create({ email, password, role: `admin` });
            res.status(200).json({
                statusCode: 200,
                message: newUser,
            });
        } catch (err) {
            next(err);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;

            const foundUser = await User.findOne({
                where: {
                    email: email,
                },
            });

            if (!foundUser) {
                throw { name: `UserNotFound` };
            }

            if (foundUser.role !== `admin`) {
                throw { name: `notAdmin` }
            }

            const passwordTrue = comparePw(password, foundUser.password);

            if (!passwordTrue) {
                throw { name: `UserNotFound` };
            }

            const payloadForClient = {
                id: foundUser.id,
            };

            const token = convertPayloadToToken(payloadForClient);

            res.status(200).json({
                statusCode: 200,
                data: {
                    accessToken: token,
                    authorId: foundUser.id,
                    displayEmail: foundUser.email,
                    displayRole: foundUser.role,
                },
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    static async setStatus(req, res, next) {
        try {
            const { status } = req.body;

            if (status !== `Waiting for confirmation` && status !== `Repair on progress` && status !== `Repair Completed` && status !== `Rejected`) {
                throw { name: `Status Bad Request` };
            }

            const reportBefore = await Report.findByPk(+req.params.id,{
                include: [User],
            });

            const report = await Report.update(
                {
                    status: status,
                },
                { where: { id: +req.params.id }, returning: true }
            );

            if (report[0] <= 0) {
                throw { name: `id_not_found` };
            }

            const user = await User.findByPk(+req.user.id);


            const nodemailer = require("nodemailer"); // Require the Nodemailer package
            async function main() {
                // SMTP config
                const transporter = nodemailer.createTransport({
                    host: "smtp-mail.outlook.com", //
                    port: 587,
                    auth: {
                        user: process.env.EMAIL, // Your Ethereal Email address
                        pass: process.env.EMAIL_PW, // Your Ethereal Email password
                    },
                }); // Send the email
                let info = await transporter.sendMail({
                    from: '"Lapor Pave" <laporpave@hotmail.com>',
                    to: `${reportBefore.User.email}, rayhanmustofa@gmail.com`, // Test email address
                    subject: "Status update from Lapor Pave!",
                    // text: "Here's a text version of the email.",
                    html: `<p> Dear, ${reportBefore.User.email.split('@')[0] } </p>
                    <p> Your report on Lapor Pave with ID ${reportBefore.id} has been updated into "${status}"</p> 
                    <p> Thank You</p>`,
                });
                console.log("Message sent: %s", info.messageId); // Output message ID
                console.log("View email: %s", nodemailer.getTestMessageUrl(info)); // URL to preview email
            }
            // Catch any errors and output them to the console
            main().catch(console.error);


            res.status(200).json({
                statusCode: 200,
                message: `Success update Report status from ${reportBefore.status} into ${status}`,
                data: report[1],
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    static async editReportById(req, res, next) {
        try {
            const { imageUrl, description, latitude, longitude } = req.body;

            const report = await Report.update(
                {
                    imageUrl, description, latitude, longitude, UploaderId
                },
                { where: { id: +req.params.id }, returning: true }
            );
            if (report[0] <= 0) {
                throw { name: `id_not_found` };
            }

            res.status(200).json({
                statusCode: 200,
                data: report[1],
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = adminController