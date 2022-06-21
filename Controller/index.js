const { User } = require("../models/index");
const { verifiedPass, createToken } = require("../helps/help");
const RadioBrowser = require("radio-browser");
const axios = require("axios");
const { APIKEY, SERVERKEY, CLIENTKEY } = process.env;
const midtransClient = require("midtrans-client");
const { sendEmail } = require("../helps/sendemail");

class Controller {
  static async register(req, res, next) {
    try {
      const { email, password, name } = req.body;
      const inputData = { email, password, name };

      if (!email) {
        throw { name: "Email is required" };
      }

      if (!password) {
        throw { name: "Password is required" };
      }

      if (!name) {
        throw { name: "Name is required" };
      }

      const newUser = await User.create(inputData);

      sendEmail(email, name, null);

      const result = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      };

      res.status(201).json(result);

      
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = {
  Controller,
};
