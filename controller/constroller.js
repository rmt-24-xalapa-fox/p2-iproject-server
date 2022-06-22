"use strict";
const { User, Tour } = require("../models");
const { verifyPassword, toToken } = require("../helper/helper");
const { OAuth2Client } = require("google-auth-library");
const { CLIENT_ID } = process.env;

class Controller {
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      console.log(username, email, password, phoneNumber, address);
      let response = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
      });
      console.log(response);
      res.status(201).json({
        id: response.id,
        email: response.email,
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        throw { msg: "invalid email/password" };
      }
      const matchPass = verifyPassword(password, user.password);
      if (!matchPass) {
        throw { msg: "invalid email/password" };
      }
      const payload = {
        id: user.id,
        email: user.email,
      };
      const access_token = toToken(payload);
      res.status(200).json({
        access_token,
      });
    } catch (err) {
      next(err);
    }
  }

  static async googleSign(req, res, next) {
    try {
      console.log(CLIENT_ID);

      const client = new OAuth2Client(CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: req.headers.credential,
        audience: CLIENT_ID,
      });
      const payload = ticket.getPayload();
      let access_token;

      let email = payload.email;
      let username = payload.name;

      let user = await User.findOne({
        where: {
          email,
        },
      });
      if (user) {
        access_token = toToken({
          id: user.id,
          email: user.email,
        });
        res.status(200).json({
          statusCode: 200,
          data: {
            access_token,
          },
          user: user,
        });
      } else {
        let obj = {
          email,
          username,
          password: "google sign in",
        };
        user = await User.create(obj, { hooks: false });
        access_token = toToken({
          id: user.id,
          email: user.email,
        });
        res.status(201).json({
          statusCode: 201,
          message: "Success create account for" + user.email,
          data: {
            access_token,
          },
          user: user,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static async dataTour(req, res, next) {
    try {
      const response = await Tour.findAll();
      if (!res) {
        throw { msg: "Not found" };
      }
      res.status(200).json({
        response,
      });
    } catch (err) {
      next(err);
    }
  }

  static async oneData(req, res, next) {
    try {
      const { id } = req.params;
      const response = await Tour.findByPk(id);
      if (!response) {
        throw { msg: "Not found" };
      }
      res.status(200).json({
        response,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
