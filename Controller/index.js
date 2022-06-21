const { User } = require("../models/index");
const { verifiedPass, createToken } = require("../helps/help");
const RadioBrowser = require("radio-browser");
const axios = require("axios");
const { APIKEY, SERVERKEY, CLIENTKEY } = process.env;
const midtransClient = require("midtrans-client");
const { sendEmail } = require("../helps/sendemail");

class Controller {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: "Email is required" };
      }

      if (!password) {
        throw { name: "Password is required" };
      }

      const findUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!findUser) {
        throw { name: "Invalid email/password" };
      }

      const checkPass = verifiedPass(password, findUser.password);

      if (!checkPass) {
        throw { name: "Invalid email/password" };
      }

      const payload = {
        id: findUser.id,
        email: findUser.email,
      };

      const token = createToken(payload);

      res.status(200).json({ access_token: token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = {
  Controller,
};
