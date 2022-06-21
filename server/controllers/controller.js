const { User, Mountain, Quota, License } = require("../models");
const { bcryptCheckPass } = require("../helpers/bcrypt");
const { convertToToken } = require("../helpers/jwt");
class Controller {
  static async registerController(req, res, next) {
    try {
      const { email, name, password, phoneNumber, numberOfClimbers } = req.body;
      const createdUser = await User.create({
        email,
        name,
        password,
        phoneNumber,
        numberOfClimbers,
      });
      const data = {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
      };
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async loginController(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { name: "Email/PasswordEmpty" };
      }
      const findUser = await User.findOne({
        where: {
          email,
        },
      });
      if (!findUser) {
        throw { name: "UserNotFound" };
      }
      const checkPass = bcryptCheckPass(password, findUser.password);
      if (!checkPass) {
        throw { name: "UserNotFound" };
      }
      const payload = {
        id: findUser.id,
        email: findUser.email,
        name: findUser.name,
      };
      const token = convertToToken(payload);
      res.status(200).json({ access_token: token });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
