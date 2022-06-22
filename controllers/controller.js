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
    } catch (err) {
      next(err);
    }
  }
}

module.exports = { Controller };
