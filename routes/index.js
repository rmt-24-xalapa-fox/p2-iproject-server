'use strict'

const routes = require('express').Router()

const userRoutes = require('./user')
const movieRoutes = require('./movie')
const actorRoutes = require('./actor')
const genreRoutes = require('./genre')
const searchRoutes = require('./search')
const favouriteRoutes = require("./favourite")

const authentication = require("../middlewares/authn")

routes.use('/user', userRoutes)
routes.use('/movie', movieRoutes)
routes.use('/actor', actorRoutes)
routes.use('/genre', genreRoutes)
routes.use('/search', searchRoutes)

routes.use('/favourite', authentication , favouriteRoutes)

module.exports = routes 