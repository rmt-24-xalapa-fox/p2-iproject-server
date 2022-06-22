"use strict";
const { User } = require("../models");
const { verifyPassword, toToken } = require("../helper/helper");

class Controller {
  static async register(req, res, next) {
    try {
      const { username, email, password, phone_number, address } = req.body;
      let response = await User.create({
        username,
        email,
        password,
        phone_number,
        address,
      });
      res.status(201).json({
        id: response.id,
        email: response.email,
      })
    } catch (err){
    next(err)
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
}

module.exports = Controller;
