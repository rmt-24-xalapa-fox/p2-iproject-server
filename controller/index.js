const { comparePassword, generateToken } = require("../helpers");
const { User, Poem } = require("../models");

class Controller {
  static async register(req, res, next) {
    try {
      const { email, username, password } = req.body;
      const createdUser = await User.create({
        email,
        username,
        password,
      });

      res.status(201).json({
        email: createdUser.email,
        username: createdUser.username,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const findUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!findUser) {
        throw { name: "USER_NOT_FOUND" };
      }

      const validatePassword = comparePassword(password, findUser.password);

      if (!validatePassword) {
        throw { name: "USER_NOT_FOUND" };
      }

      const payload = {
        id: findUser.id,
      };

      const token = generateToken(payload);

      res.status(200).json({
        id: findUser.id,
        email: findUser.email,
        username: findUser.username,
        access_token: token,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async getPoem(req, res, next) {
    try {
      const data = await Poem.findAll({
        order: [["createdAt", "Desc"]],
      });

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
  static async getDetail(req, res, next) {
    try {
      const id = +req.params.id;
      const detail = await Poem.findByPk(id);

      res.status(200).json(detail);
    } catch (err) {
      next(err);
    }
  }
  static async createPoem(req, res, next) {
    try {
      const { title, author, content } = req.body;
      const createdPoem = await Poem.create({
        title,
        author,
        content,
        UserId: req.userId,
      });

      res.status(201).json(createdPoem);
    } catch (err) {
      next(err);
    }
  }
  static async getMyPoem(req, res, next) {
    try {
      const id = +req.params.id;
      const myPoem = await Poem.findAll({
        where: {
          UserId: req.userId,
        },
        order: [["createdAt", "Desc"]],
      });

      res.status(200).json(myPoem);
    } catch (err) {
      next(err);
    }
  }
}
module.exports = Controller;
