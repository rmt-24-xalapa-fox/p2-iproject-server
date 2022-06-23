"use strict";
const { User, Post, Inbox } = require();

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
<<<<<<< HEAD
=======

  static async register(req, res, next) {
    try {
      const { email, password } = req.body;

      const result = await User.create({
        email,
        password,
      });

      res.status(201).json({
        statusCode: 201,
        data: {
          id: result.id,
          email: result.email,
          role: result.role,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const targetEmail = await User.findOne({
        where: { email: email },
      });

      if (!targetEmail) {
        throw { name: "Email/password invalid" };
      }

      const isPassTrue = comparePass(password, targetEmail.password);

      if (!isPassTrue) {
        throw { name: "Email/password invalid" };
      }

      //sending token

      const payload = {
        email: targetEmail.email,
        role: targetEmail.role,
      };

      const token = payloadToToken(payload);

      res.status(200).json({
        statusCode: 200,
        data: {
          access_token: token,
          role: targetEmail.role,
          id: targetEmail.id,
        },
      });
    } catch (err) {
      next(err);
    }
  }
>>>>>>> login
}

module.exports = { Controller };
