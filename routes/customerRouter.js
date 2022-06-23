"use strict";

const express = require('express');
const CustomerController = require('../controllers/customerController');
const authentication = require('../middlewares/authCustomer');
const authorization = require('../middlewares/authorCust');

const router = express.Router();

router.get("/product", CustomerController.allProduct);
router.post("/register", CustomerController.registerCustomer);
router.post("/login", CustomerController.loginCustomer);
router.use(authentication);
router.get("/bookmark", CustomerController.getAllBookmark);
router.get("/detail/:id", CustomerController.detailProduct);
router.post("/bookmark/:id", CustomerController.addProduct);
router.get("/cart", CustomerController.getAllCart);
router.post("/cart/:id", CustomerController.addToCart);
router.patch("/cart/:id", CustomerController.buyProduct);
router.use(authorization);
router.delete("/cart/:id", CustomerController.deleteBookmark);
module.exports = router;