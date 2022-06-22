"use strict"
const router = require("express").Router();
const userRouter = require("./user");
const movieRouter = require("./movie");
const transactionRouter = require("./transaction");
const priceRouter = require("./price");
const paymentRouter = require("./payment");

router.use("/", userRouter);
router.use("/movies", movieRouter);
router.use("/transactions", transactionRouter);
router.use("/payment", paymentRouter);
router.use("/prices", priceRouter);

// router.use("/movies", movieRouter);

module.exports = router;