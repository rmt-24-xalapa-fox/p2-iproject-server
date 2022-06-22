"use strict"
const router = require("express").Router();
const userRouter = require("./userRouter");
const movieRouter = require("./movieRouter");
const transactionRouter = require("./transactionRouter");
const priceRouter = require("./priceRouter");
const paymentRouter = require("./paymentRouter");

router.use("/", userRouter);
router.use("/movies", movieRouter);
router.use("/transactions", transactionRouter);
router.use("/payment", paymentRouter);
router.use("/prices", priceRouter);

// router.use("/movies", movieRouter);

module.exports = router;