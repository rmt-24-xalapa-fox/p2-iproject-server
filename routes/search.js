'use strict'

const express = require('express')
const searchRoutes = express.Router()
const Controller = require("../controllers/searchController")

searchRoutes.get("/movies", Controller.searchMovies)

module.exports = searchRoutes