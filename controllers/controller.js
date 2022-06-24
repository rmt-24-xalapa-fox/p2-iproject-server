const {db} = require("../config/firebaseconfig");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer")

class Controller {
    static sendNotif(req, res) {
        try {
            const {userEmail} = req.body
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: "bernarduuuus@gmail.com",
                    pass: "bernardus",
                    clientId: "300342072016-kgqpjgkc8n738uvf3evsje6feru3s0oo.apps.googleusercontent.com",
                    clientSecret: "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",
                    refreshToken: "1//040_qUCzHRYA3CgYIARAAGAQSNwF-L9IrXVyJ0eiuzH2EFn4YC6iyyaK-l3hpoAuzyy6nBa-EfD6IvGRerEP04imqA6-XfTTNoUE"
                }
            })

            let mailOptions = {
                from: "bernarduuuus@gmail.com",
                to: userEmail,
                subject: 'Register Notif',
                text: `Terimakasih sudah daftar di aplikasi YourChat!`
            };
    
            transporter.sendMail(mailOptions, function(err, data) {
                if (err) {
                    console.log("Error " + err);
                } else {
                    console.log("Email sent successfully");
                }
            })
            
            res.status(201).json({
                message: "Email notif sent!"
            });
        } catch (error) {
            console.log(error);
            const code = 500;
            const message = "ISE";

            res.status(code).json({
                message
            })
        }
    }
}

module.exports = Controller;