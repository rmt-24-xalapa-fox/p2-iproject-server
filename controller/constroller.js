"use strict";
const { User, Tour } = require("../models");
const { verifyPassword, toToken } = require("../helper/helper");
const { OAuth2Client } = require("google-auth-library");
const { CLIENT_ID, API_KEY } = process.env;
const axios = require("axios");

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
        throw { name: "invalid email/password" };
      }
      const matchPass = verifyPassword(password, user.password);
      if (!matchPass) {
        throw { name: "invalid email/password" };
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
      // console.log(CLIENT_ID);
      const { credential } = req.body;
      // console.log(credential);
      const client = new OAuth2Client(CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: CLIENT_ID,
      });
      // console.log(ticket);
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
        let response = await User.create(obj, { hooks: false });
        access_token = toToken({
          id: response.id,
          email: response.email,
        });
        res.status(201).json({
          statusCode: 201,
          message: "Success create account for" + user.email,
          data: {
            access_token,
          },
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
        throw { name: "Not found" };
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
        throw { name: "Not found" };
      }
      res.status(200).json({
        response,
      });
    } catch (err) {
      next(err);
    }
  }

  static async spesificTour(req, res, next) {
    try {
      const { q } = req.query;
      console.log(q);
      let response = await axios.get(
        `https://pixabay.com/api/?key=${API_KEY}=${q}&image_type=photo&per_page=10`
      );
      res.status(200).json({
        response: response.data.hits,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
