"use strict";
const axios = require("axios");
const apiKey = process.env.API_KEY;
const apiHost = process.env.API_HOST;

class ApiController {
  static async getHero(req, res, next) {
    try {
      const response = await axios({
        method: "GET",
        url: "https://unofficial-mobile-legends.p.rapidapi.com/heroes",
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": apiHost,
        },
      });
      // console.log(response.data);

      res.status(200).json({
        response: response.data,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getHeroDetail(req, res, next) {
    try {
      const HeroId = +req.params.id;
      const response = await axios({
        method: "GET",
        url: `https://unofficial-mobile-legends.p.rapidapi.com/heroes/${HeroId}`,
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": apiHost,
        },
      });
      // console.log(response.data.data);
      res.status(200).json({
        response: response.data,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getRoles(req, res, next) {
    try {
      const response = await axios({
        method: "GET",
        url: "https://unofficial-mobile-legends.p.rapidapi.com/roles",
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": apiHost,
        },
      });
      // console.log(response.data);

      res.status(200).json({
        response: response.data,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getHeroByRole(req, res, next) {
    try {
      let role = req.params.role;
      const response = await axios({
        method: "GET",
        url: `https://unofficial-mobile-legends.p.rapidapi.com/roles/${role}`,
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": apiHost,
        },
      });
      console.log(response.data);

      res.status(200).json({
        response: response.data,
      });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = ApiController;
