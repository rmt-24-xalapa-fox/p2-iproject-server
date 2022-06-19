"use strict";

const { Controller } = require("../controllers/controller");
const router = require("express").Router();

//add new product
router.post("/products");

//get all product
router.get("/products");

//get one product
router.get("/products/:id");

//edit one product
router.put("/products/:id");

//edit one product
router.delete("/products/:id");

//=============================

//add new categories
router.post("/categories");

//get all categories
router.get("/categories");

//get one category
router.get("/categories/:id");

//edit category
router.put("/categories/:id");

//delete category
router.delete("/categories/:id");

//=============================

//add new ingredient
router.post("/ingredients");

//get all ingredients
router.get("/ingredients");

//get one ingredient
router.get("/ingredients/:id");

//edit ingredient
router.put("/ingredients/:id");

//delete ingredient
router.delete("/ingredients/:id");
//=============================

//add new recipe
router.post("/recipes");

//get all recipes
router.get("/recipes");

//get one recipe
router.get("/recipes/:id");

//edit recipe
router.put("/recipes/:id");

//delete recipe
router.delete("/recipes/:id");

//=============================

//add new sales data
router.post("/sales");

//get all sales
router.get("/sales");

//get one sale
router.get("/sales/:id"); //by date?

//edit sales
router.put("/sales/:id"); //authorization

//delete sales
router.delete("/sales/:id");

router.module.exports = router;
