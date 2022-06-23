const customerRoute = require("express").Router()
const CustomerController = require("../controllers/customerController")
const customerAuthen  = require("../middlewares/customerAunten")

customerRoute.get("/", CustomerController.homeCust)
customerRoute.post("/register",  CustomerController.registerCust)
customerRoute.post("/login",  CustomerController.loginCust)
customerRoute.get("/novel/:id",  CustomerController.novelById)

customerRoute.get("/favorite", customerAuthen, CustomerController.getAllFavorite)
customerRoute.post("/favorite/:id", customerAuthen, CustomerController.addFavorite)

module.exports = customerRoute