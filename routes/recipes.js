"use strict";

const { Controller } = require("../controllers/controller");
const router = require("express").Router();

//add new recipe
router.post("/", Controller.addRecipe);

module.exports = router;
