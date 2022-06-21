"use strict";
const axios = require('axios');
const apiKeyTMBD = process.env.secretApiTMDB;

class Controller {
  static async searchMovies(req, res, next) {
    try {
      const {search} = req.body
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKeyTMBD}&query=${search}`
      );
      res.status(200).json(response.data);
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Controller;
