const express = require("express");
const movieController = require("../controllers/movie_controller");
const movieRouter = express.Router();
movieRouter.get("/", movieController.getMainFeed);
movieRouter.get("/:id", movieController.getDetails);
movieRouter.get("/test", movieController.test);
movieRouter.get("/search/:query", movieController.searchMovies);
module.exports = movieRouter;
