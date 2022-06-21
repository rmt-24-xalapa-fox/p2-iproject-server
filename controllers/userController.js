"use strict";
const { User } = require("../models");
const { comparePass } = require("../helpers/bcrypt");
const { tokenUser } = require("../helpers/token");

class UserController {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const createdUser = await User.create({
        email,
        password,
      });

      res.status(201).json({
        statusCode: 201,
        data: createdUser,
      });
    } catch (err) {
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

      if (!email || !password) {
        throw { name: "USER NOT FOUND" };
      }

      if (!findUser) {
        throw { name: "USER NOT FOUND" };
      }

      const checkPass = comparePass(password, findUser.password);
      if (!checkPass) {
        throw { name: "USER NOT FOUND" };
      }

      const payloadClient = {
        id: findUser.id,
        email: findUser.email,
      };

      const token = tokenUser(payloadClient);

      res.status(200).json({
        statusCode: 200,
        access_token: token,
        id: payloadClient.id,
        email: payloadClient.email,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = UserController;
