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

  static async createBuild(req, res, next) {
    try {
      let { HeroId, Item1Id, Item2Id, Item3Id, Item4Id, Item5Id, Item6Id, Item7Id } = req.body;
      let { id: UserId } = req.user;
      let newBuild = { UserId, HeroId, Item1Id, Item2Id, Item3Id, Item4Id, Item5Id, Item6Id, Item7Id };

      const builds = await Build.create(newBuild);

      res.status(201).json({
        statusCode: 201,
        builds,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getBuilds(req, res, next) {
    try {
      const buildList = await Build.findAll({
        include: [
          {
            model: User,
            attributes: {
              exclude: ["password"],
            },
          },
          {
            model: Hero,
          },
          {
            model: Item,
            as: "item1",
          },
          {
            model: Item,
            as: "item2",
          },
          {
            model: Item,
            as: "item3",
          },
          {
            model: Item,
            as: "item4",
          },
          {
            model: Item,
            as: "item5",
          },
          {
            model: Item,
            as: "item6",
          },
          {
            model: Item,
            as: "item7",
          },
        ],
      });
      res.status(200).json({
        statusCode: 200,
        buildList,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = Controller;
