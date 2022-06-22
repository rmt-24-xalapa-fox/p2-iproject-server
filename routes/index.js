"use strict";
const express = require("express");
const Controller = require("../controller/constroller");
const handleError = require("../middleware/handleError");
const router = express.Router();

router.post("/register", Controller.register);
router.post("/login", Controller.login);

router.use((err, req, res, next) => {
  handleError(err, req, res, next);
});

module.exports = router;
