"use strict";

const { User, Hero, Item, Build } = require("../models");

class Controller {
  static async getHero(req, res, next) {
    try {
      const heroList = await Hero.findAll();

      res.status(200).json({
        statusCode: 200,
        heroList,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getItems(req, res, next) {
    try {
      const itemList = await Item.findAll();

      res.status(200).json({
        statusCode: 200,
        itemList,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
