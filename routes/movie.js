'use strict'

const express = require('express')
const movieRoutes = express.Router()
const Controller = require("../controllers/movieController")

movieRoutes.get("/popular", Controller.moviePopular)
movieRoutes.get("/genre", Controller.movieGenre)
movieRoutes.get("/upcoming", Controller.movieUpcoming)

module.exports = movieRoutes