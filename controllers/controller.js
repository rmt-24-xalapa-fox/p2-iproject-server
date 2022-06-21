const { User, Category, Product, History } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { sign } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
const { CLIENT_ID } = process.env;

class Controller {
  static async register(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
