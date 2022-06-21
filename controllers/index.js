const axios = require("axios");
const { decryptPassword } = require("../helpers/bcrypt");
const { convertPayloadToToken } = require("../helpers/jwt");
const { User, ColorPalette } = require("../models");

class Controller {
  static async register(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const input = {
        name,
        email,
        password,
      };
      const user = await User.create(input);
      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: `Email can't be empty` };
      }
      if (!password) {
        throw { name: `Password can't be empty` };
      }
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        throw { name: "Invalid email/password" };
      }
      const passwordValidated = decryptPassword(password, user.password);
      if (!passwordValidated) {
        throw { name: "Invalid email/password" };
      }
      const payload = {
        id: user.id,
        email: user.email,
      };
      const access_token = convertPayloadToToken(payload);
      res.status(200).json({
        access_token,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
