"use strict";

const { comparePass, hashPass } = require("../helpers/bcrypt");
const { User, Post, Inbox } = require("../models");

class Controller {
  static async createPost(req, res, next) {
    try {
      const {
        requestName,
        requestSeries,
        uploadImg,
        fetchedOfferName,
        fetchedOfferSeries,
        fetchedOfferImg,
      } = req.body;

      const { id } = req.user;

      const response = Post.create({
        UserId: id,
        requestName,
        requestSeries,
        uploadImg,
        offerName: fetchedOfferName,
        offerSeries: fetchedOfferSeries,
        fetchedImg: fetchedOfferImg,
      });
      console.log(response);
      //   res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async register(req, res, next) {
    try {
      let { username, password } = req.body;

      password = hashPass(password);

      const result = await User.create({
        username,
        password,
      });

      res.status(201).json({
        data: {
          id: result.id,
          username: result.username,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const targetUser = await User.findOne({
        where: { username: username },
      });

      if (!targetUser) {
        throw { name: "Email/password invalid" };
      }

      const isPassTrue = comparePass(password, targetUser.password);

      if (!isPassTrue) {
        throw { name: "Email/password invalid" };
      }

      //sending token

      const payload = {
        username: targetUser.username,
      };

      const token = payloadToToken(payload);

      res.status(200).json({
        data: {
          access_token: token,
          id: targetUser.id,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = { Controller };
