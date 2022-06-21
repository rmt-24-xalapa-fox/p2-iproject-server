const movieRouter = require("./movie_router");

const express = require("express");
const router = express.Router();

router.use("/movies", movieRouter);

module.exports = router;
