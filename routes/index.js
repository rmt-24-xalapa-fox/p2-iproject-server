"use strict";
const express = require("express");
const Controller = require("../controller/constroller");
const router = express.Router();

router.post("/register", Controller.register);
router.post("/login", Controller.login);

module.exports = router;
