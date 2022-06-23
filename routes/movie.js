'use strict'

const express = require('express')
const movieRoutes = express.Router()
const Controller = require("../controllers/movieController")

movieRoutes.get("/popular", Controller.moviePopular)
movieRoutes.get("/upcoming", Controller.movieUpcoming)
movieRoutes.get("/detail", Controller.movieDetail)

module.exports = movieRoutes