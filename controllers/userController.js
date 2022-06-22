"use strict";
const { User } = require("../models");
const { bcryptCompare, bcryptHash } = require("../helpers/bcrypt");
const { jwtSign } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID = process.env.CLIENT_ID;
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'event_lokal@outlook.com',
    pass: 'Eventlokal1'
  }
})

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
        from: 'event_lokal@outlook.com',
        to: email,
        subject: `EVENT LOKAL : WELCOME`,
        text: `Hi ${createdUser.name}!, Your EVENT LOKAL account has been created`
      }

      await transporter.sendMail(options, function(err,info) {
        if (err) {
          console.log(err);
        } else {
          console.log(`sent: ${info.response}`);
        }
      })

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
          email,
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
          name: foundAccount.name,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async googleLogin(req, res) {
    try {
      const { credential } = req.body;
      const client = new OAuth2Client(CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();
      const userid = payload["sub"];
      // If request specified a G Suite domain:
      // const domain = payload['hd'];
      let email = payload.email;
      let user = await User.findOne({ where: { email } });
      if (user) {
        const clientPayload = {
          id: user.id,
        };

        const clientToken = jwtSign(clientPayload);

        res.status(200).json({
          access_token: clientToken,
          email,
          role: user.role,
        });
      } else {
        console.log(payload);
        let username = payload.name.split(" ").join("_");
        console.log(email);
        let obj = {
          username: email,
          email,
          password: "Google Sign In",
          role: "staff",
          phoneNumber: Math.floor(Math.random() * 1000) + 1,
          address: "Google Sign In",
        };
        user = await User.create(obj, { hooks: false });
        const clientPayload = {
          id: user.id,
        };

        const clientToken = jwtSign(clientPayload);
        res.status(201).json({
          access_token: clientToken,
          email,
          role: user.role,
          message: `success create google account`,
        });
      }
    } catch (err) {
      console.log(err, `<<<<<<<`);
    }
  }
}

module.exports = UserController;
