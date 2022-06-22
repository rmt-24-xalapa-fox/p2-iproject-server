"use strict";

const { compareHashWithPass, createToken } = require("../helpers/helper");
const { User } = require("../models/index");
const { OAuth2Client } = require("google-auth-library");
const nodemailer = require("nodemailer");

// NODEMAILER
let transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  secureConnection: false,
  port: 587,
  auth: {
    user: "movieFikar@outlook.com",
    pass: "sasukee32",
  },
});

class Controller {
  static async listUser(req, res, next) {
    try {
      const findUser = await User.findAll({
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
        order: [["id", "ASC"]],
      });
      res.status(200).json({
        statusCode: 200,
        data: findUser,
      });
    } catch (err) {
      next(err);
    }
  }

  static async register(req, res, next) {
    try {
      const { nickname, email, password } = req.body;
      const newUser = await User.create({
        nickname,
        email,
        password,
      });

      if (!newUser) {
        throw new Error("REGISTRATION_FAILED");
      }

      let mailOptions = {
        from: '"movieFikar" <movieFikar@outlook.com>', // sender address
        to: newUser.email, // list of receivers
        subject: "Thanks for sign in movieFikar", // Subject line
        text: "Hello " + newUser.nickname + " Thanks for sign in movieFikar", // plain text body
        html:
          "<b> Hello '" + newUser.nickname + "' Thanks for sign in movieFikar. </b> <a>Click </a> <a href='http://localhost:3002/login'>here</a><a > to Login</a>" , // html body
          
      };
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error, "ini error nodemailer");
        } else {
          console.log("Email is send");
        }
      });

      res.status(201).json({
        statusCode: 201,
        message: "Succes created user",
        data: {
          id: newUser.id,
          nickname: newUser.username,
          email: newUser.email,
        },
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
          email,
        },
      });

      if (!foundUser) {
        throw new Error("USER_NOT_FOUND");
      }

      const correctPassword = compareHashWithPass(password, foundUser.password);

      if (!correctPassword) {
        throw new Error("INVALID_PASSWORD");
      }

      //bikin payload dulu
      const payload = {
        id: foundUser.id,
        nickname: foundUser.nickname,
        email: foundUser.email,
      };

      const access_token = createToken(payload);

      res.status(200).json({
        statusCode: 200,
        message: "Succes Login",
        access_token: access_token,
        payload,
      });
    } catch (err) {
      next(err);
    }
  }
  
}

module.exports = Controller;
