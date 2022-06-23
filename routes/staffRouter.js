const staffRoute = require("express").Router()
const StaffController = require("../controllers/staffController")

staffRoute.post("/register", StaffController.registerStaff)
staffRoute.post("/login", StaffController.loginStaff)
staffRoute.post("/google-sign", StaffController.loginByGoogle)

module.exports = staffRoute