"use strict";

const { Controller } = require("../controllers/controller");
const router = require("express").Router();

//add new recipe
router.post("/", Controller.addRecipe);

//get all recipes
router.get("/", Controller.getAllRecipes);

//get one recipe
router.get("/:id", Controller.getOneRecipe);

//edit recipe
router.put("/:id", Controller.editRecipe);

//delete recipe
router.delete("/:id", Controller.deleteRecipe);

module.exports = router;
