"use strict";
const { User } = require("../models");
const { bcryptCompare, bcryptHash } = require("../helpers/bcrypt");
const { jwtSign } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID = process.env.CLIENT_ID;
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "event_lokal@outlook.com",
    pass: "Eventlokal1",
  },
});

class UserController {
  static async register(req, res, next) {
    try {
      const { name, password, email, phoneNumber } = req.body;

      const createdUser = await User.create({
        name,
        email,
        password,
        phoneNumber,
        password: bcryptHash(password),
      });

      const options = {
        from: "event_lokal@outlook.com",
        to: email,
        subject: `EVENT LOKAL : WELCOME`,
        text: `Hi ${createdUser.name}!, Your EVENT LOKAL account has been created`,
      };

      await transporter.sendMail(options, function (err, info) {
        if (err) {
          console.log(err);
        } else {
          console.log(`sent: ${info.response}`);
        }
      });

      res.status(201).json({
        statusCode: 201,
        data: {
          message: "User has been created",
          data: {
            id: createdUser.id,
            name: createdUser.name,
            email: createdUser.email,
            phoneNumber: createdUser.phoneNumber,
          },
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      let reqEmail = email;
      let reqPassword = password;

      if (!email || !password) {
        throw { name: "EmptyField" };
      }

      const foundAccount = await User.findOne({
        where: {
          email: reqEmail,
        },
      });

      if (!foundAccount) {
        throw { name: "UserNotFound" };
      }

      const passwordComparation = bcryptCompare(
        reqPassword,
        foundAccount.password
      );

      if (!passwordComparation) {
        throw { name: "WrongPassword" };
      }

      const clientPayload = {
        id: foundAccount.id,
      };

      const clientToken = jwtSign(clientPayload);

      res.status(200).json({
        statusCode: 200,
        data: {
          access_token: clientToken,
          userId: foundAccount.id,
          email: foundAccount.email,
          username: foundAccount.username,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
