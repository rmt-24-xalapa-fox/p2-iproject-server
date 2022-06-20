"use strict";

const { Controller } = require("../controllers/controller");
const router = require("express").Router();

//add new categories
router.post("/", Controller.addCategory);

//get all categories
router.get("/", Controller.getAllCategories);

//get one category
router.get("/:id", Controller.getOneCategory);

//edit category
router.put("/:id", Controller.editCategory);

module.exports = router;
