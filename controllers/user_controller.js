const { hashPassword, verifyPassword } = require("../helpers/bcrypt");
const { generateJWToken } = require("../helpers/jwt");
const { User } = require("../models");
class userController {
  static test(req, res, next) {
    res.status(200).json({ message: "Server berfungsi" });
  }

  static async register(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const hash = hashPassword(password);
      const newUser = await User.create({ email, name, password: hash });
      delete newUser.dataValues.createdAt;
      delete newUser.dataValues.updatedAt;
      delete newUser.dataValues.password;
      res.status(201).json({ status: "success", data: newUser });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: "bad input", message: "Email cannot be empty!" };
      }
      if (!password) {
        throw { name: "bad input", message: "Password cannot be empty!" };
      }
      const foundUser = await User.findOne({ where: { email } });
      if (!foundUser || !verifyPassword(password, foundUser.password)) {
        throw {
          name: "login fail",
          message: "Invalid email/password",
        };
      }
      const access_token = generateJWToken({
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
      });
      res.status(200).json({ status: "success", data: { access_token } });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = userController;
