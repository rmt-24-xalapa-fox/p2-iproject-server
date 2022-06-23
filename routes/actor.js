'use strict'

const express = require('express')
const actorRoutes = express.Router()
const Controller = require("../controllers/actorController")

actorRoutes.get("/popular", Controller.actorPopular)

module.exports = actorRoutes