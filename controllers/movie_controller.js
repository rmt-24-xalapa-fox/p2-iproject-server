const axios = require("axios");
const {
  searchMovies,
  getDetails,
  discoverMovies,
  getTrailer,
} = require("../helpers/apiHelper");
class movieController {
  static test(req, res, next) {
    res.status(200).json({ message: "Server berfungsi" });
  }

  static async getMainFeed(req, res, next) {
    try {
      let movieList = [];
      let { sort, page, query } = req.query;
      if (!sort) {
        sort = "popularity";
      }
      if (!page) {
        page = 1;
      }
      if (!query) {
        movieList = await discoverMovies(sort, page);
      } else {
        movieList = await searchMovies(query, page);
      }
      const modifiedMovieList = [];
      movieList.results.forEach((el) => {
        modifiedMovieList.push({
          title: el.title,
          id: el.id,
          overview: el.overview,
          poster_path: el.poster_path,
          release_date: el.release_date,
          original_language: el.original_language,
        });
      });
      movieList.results = modifiedMovieList;
      res.status(200).json(movieList);
    } catch (err) {
      next(err);
    }
  }
  static async getDetails(req, res, next) {
    try {
      let { id } = req.params;
      const movie = await getDetails(id);
      if (movie.response) {
        throw { name: "not found", message: "Movie not found" };
      }
      const trailer = await getTrailer(movie);
      movie.trailer = trailer;
      res.status(200).json(movie);
    } catch (err) {
      next(err);
    }
  }
  static async searchMovies(req, res, next) {
    try {
      let { query } = req.params;
      let { page } = req.body;
      if (!page) {
        page = 1;
      }
      const movieList = await searchMovies(query, page);
      const modifiedMovieList = [];
      movieList.results.forEach((el) => {
        modifiedMovieList.push({
          title: el.title,
          id: el.id,
          overview: el.overview,
          poster_path: el.poster_path,
          release_date: el.release_date,
          original_language: el.original_language,
        });
      });
      movieList.results = modifiedMovieList;
      res.status(200).json(movieList);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = movieController;
