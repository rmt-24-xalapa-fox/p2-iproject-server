"use strict";
const express = require("express");
const Controller = require("../controller/constroller");
const handleError = require("../middleware/handleError");
const router = express.Router();

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.post("/google-sign", Controller.googleSign);
router.get("/tour", Controller.dataTour);
router.get("/tour/:id", Controller.oneData);
router.get("/spesifictour", Controller.spesificTour);

router.use((err, req, res, next) => {
  handleError(err, req, res, next);
});

module.exports = router;
