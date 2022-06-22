"use strict";

const { verifyPassword, toToken } = require("../helper/helper");

class Controller {
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
