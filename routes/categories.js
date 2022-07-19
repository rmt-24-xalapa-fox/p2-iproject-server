"use strict";

const { Controller } = require("../controllers/controller");
const router = require("express").Router();

//get all categories
router.get("/", Controller.getAllCategories);

module.exports = router;
