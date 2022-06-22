"use strict";
const express = require("express");
const Controller = require("../controller/constroller");
const router = express.Router();

router.post("/register", Controller.register);
router.post("/login", Controller.register);

module.exports = router;
