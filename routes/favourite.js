'use strict'

const express = require('express')
const favouriteRoutes = express.Router()
const Controller = require("../controllers/favouriteController")

favouriteRoutes.get("/", Controller.favouriteList)
favouriteRoutes.post("/add", Controller.favouriteAdding)
favouriteRoutes.delete("/delete", Controller.favouriteDelete)

module.exports = favouriteRoutes