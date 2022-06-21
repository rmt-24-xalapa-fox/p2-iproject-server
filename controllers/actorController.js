"use strict";
const axios = require('axios');
const apiKeyTMBD = process.env.secretApiTMDB;

class Controller {
  static async actorPopular(req, res, next) {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/person/popular?api_key=${apiKeyTMBD}`
      );
      res.status(200).json(response.data);
    } catch (error) {
        next(error)
    }
  }

}

module.exports = Controller;
