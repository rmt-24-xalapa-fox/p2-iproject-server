"use strict";

const nodemailer = require("nodemailer");

const sendMail = async (req, res, next) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "gmail",
      port: 587,
      secure: false,
      auth: {
        user: "sahmguban28@gmail.com", // generated ethereal user
        pass: process.env.PASSWORD, // generated ethereal password
      },
    });

    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <sahmguban28@gmail.com>', // sender address
      to: "muridsodipta@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Thank you for Register", // plain text body
      html: "<b>Thank You For Register</b>", // html body
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = sendMail;
