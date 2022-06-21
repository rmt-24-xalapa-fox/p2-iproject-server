const express = require("express");
const movieController = require("../controllers/movie_controller");
const movieRouter = express.Router();

movieRouter.get("/test", movieController.test);

module.exports = movieRouter;
