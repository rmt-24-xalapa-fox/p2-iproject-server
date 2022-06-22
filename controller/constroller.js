"use strict";
const { User } = require("../models");

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
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
