"use strict";

const { Controller } = require("../controllers/controller");
const router = require("express").Router();

//add new product
router.post("/", Controller.addProduct);

//get all product
router.get("/", Controller.getAllProducts);

//get one product
router.get("/:id", Controller.getOneProduct);

//edit one product
router.put("/:id", Controller.editProduct);

//delete one product
router.delete("/:id", Controller.deleteProduct);

router.module.exports = router;
