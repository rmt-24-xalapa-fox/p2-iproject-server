'use strict'

const express = require('express')
const genreRoutes = express.Router()
const Controller = require("../controllers/genreController")

genreRoutes.get("/list", Controller.genreList)

module.exports = genreRoutes