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

  static async movieDetail(req, res, next) {
    try {
      const { movieId } = req.body
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKeyTMBD}&language=en-US&append_to_response=credits%2Cvideos%2Cimages`
      );
      res.status(200).json(response.data);
    } catch (error) {
        next(error)
    }
  }
}

module.exports = Controller;
