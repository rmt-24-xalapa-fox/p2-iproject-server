"use strict";
const axios = require('axios');
const apiKeyTMBD = process.env.secretApiTMDB;

class Controller {
  static async moviePopular(req, res, next) {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKeyTMBD}`
      );
      res.status(200).json(response.data);
    } catch (error) {
        next(error)
    }
  }

  static async movieGenre(req, res, next) {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKeyTMBD}`
      );
      res.status(200).json(response.data);
    } catch (error) {
        next(error)
    }
  }

  static async movieUpcoming(req, res, next) {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKeyTMBD}`
      );
      res.status(200).json(response.data);
    } catch (error) {
        next(error)
    }
  }
}

module.exports = Controller;
