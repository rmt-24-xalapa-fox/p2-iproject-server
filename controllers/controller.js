const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User, MyDigimon } = require("../models");
const axios = require("axios");

class Controller {
  static async register(req, res) {
    try {
      const { username, email, password } = req.body;
      const createdUser = await User.create({
        username,
        email,
        password,
        gachaCoin: 0,
        role: "Customer",
      });
      res.status(201).json({
        email: createdUser.email,
        username: createdUser.username,
        role: createdUser.role,
      });
    } catch (err) {
      if (
        err.name == "SequelizeUniqueConstraintError" ||
        err.name == "SequelizeValidationError"
      ) {
        res.status(400).json({ message: err.errors[0].message });
      } else {
        res.status(500).json(err);
      }
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const foundUser = await User.findOne({ where: { email } });

      if (!foundUser) {
        throw { name: "InvalidLogin" };
      }

      const isMatched = comparePassword(password, foundUser.password);

      if (!isMatched) {
        throw { name: "InvalidLogin" };
      }

      const payload = {
        id: foundUser.id,
        role: foundUser.role,
      };

      const access_token = signToken(payload);

      res.status(200).json({ access_token, username: foundUser.username });
    } catch (err) {
      if (err.name == "InvalidLogin") {
        res.status(401).json({ message: "Invalid email/password" });
      } else {
        res.status(500).json(err);
      }
    }
  }

  static async fetchCoin(req, res) {
    try {
      const userId = req.user.id;

      const foundUser = await User.findOne({ where: { id: userId } });
      res.status(200).json({ gachaCoin: foundUser.gachaCoin });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = Controller;
