'use strict'

const express = require('express')
const userRoutes = express.Router()
const Controller = require("../controllers/userController")

// GET /user/register
userRoutes.get("/", Controller.listUser)
// POST /user/register
userRoutes.post("/register", Controller.register)
// POST /user/login
userRoutes.post("/login", Controller.login)

module.exports = userRoutes