"use strict";

const { compareHashWithPass, createToken } = require("../helpers/helper");
const { Favourite, User } = require("../models/index");

class Controller {
  static async favouriteList(req, res, next) {
    try {
      const myId = +req.additionalData.id;

      const myFavourite = await Favourite.findAll({
        where: {
          UserId: myId,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        order: [["id", "DESC"]],
      });

      res.status(200).json(myFavourite);
    } catch (err) {
      next(err);
    }
  }

  static async favouriteAdding(req, res, next) {
    try {
      const { title, imageUrl, vote, release, genre, movieId } = req.body;
      const newFavourite = await Favourite.create({
        title,
        imageUrl,
        vote,
        release,
        genre,
        movieId,
        UserId: +req.additionalData.id,
      });

      // Berhasil bikin databaru
      res.status(201).json({
        statusCode: 201,
        message: "Succes added to favourite",
        data: newFavourite,
      });
    } catch (err) {
      next(err);
    }
  }

  static async favouriteDelete(req, res, next) {
    try {
      const id = +req.params.id
      const destroyFavorite = await Favourite.destroy({
          where: {
              id: id
          },
      });

      if (destroyFavorite <= 0) {
          throw new Error("FOOD_NOT_FOUND");
      }

      res.status(200).json({
          statusCode: 200,
          message: `Favorite with id ${id} deleted successfully`,
      });

  } catch (err) {
      next(err);
  }
  }
}

module.exports = Controller;
