"use strict";

const { Controller } = require("../controllers/controller");
const router = require("express").Router();

//add new ingredient
router.post("/", Controller.addIngredient);

//get all ingredients
router.get("/", Controller.getAllIngredients);

//get one ingredient
router.get("/:id", Controller.getOneIngredient);

//edit ingredient
router.put("/:id", Controller.editIngredient);

//delete ingredient
router.delete("/:id", Controller.deleteIngredient);

router.module.exports = router;
