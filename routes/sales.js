"use strict";

const { Controller } = require("../controllers/controller");
const router = require("express").Router();

//add new sales data
router.post("/", Controller.addSale);

//get all sales
router.get("/", Controller.getAllSales);

//get one sale
router.get("/:id", Controller.getOneSale); //by date?

//edit sales
router.put("/:id", Controller.editSale); //authorization

//delete sales
router.delete("/:id", Controller.deleteSale);

router.module.exports = router;
