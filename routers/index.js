const movieRouter = require("./movie_router");
const userRouter = require("./user_router");

const express = require("express");
const router = express.Router();

router.use("/movies", movieRouter);
router.use("/users", userRouter);

module.exports = router;
