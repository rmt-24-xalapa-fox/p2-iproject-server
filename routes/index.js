"use strict"
const express = require("express")
const router = express.Router()
const userController = require("../controllers/customer")
const authenticationCustomer = require("../middlewares/authentication")

router.get("/products", userController.getAllProduct)
router.post("/register", userController.registerCust)
router.post("/login", userController.loginCust)
router.post("/google-signIn", userController.googleSignInCustomer)
router.get("/products/:id", userController.getAllProductById)
router.use(authenticationCustomer)
router.get("/favorites", userController.getAllFavorite)
router.post("/favorites/:id", userController.addNewFavorite)
router.delete("/favorites/:id", userController.deleteFavorite)

router.use(errorHandler);

module.exports = router