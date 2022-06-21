'use strict'

const routes = require('express').Router()

const userRoutes = require('./user')
const movieRoutes = require('./movie')
const actorRoutes = require('./actor')
const genreRoutes = require('./genre')
const searchRoutes = require('./search')

routes.use('/user', userRoutes)
routes.use('/movie', movieRoutes)
routes.use('/actor', actorRoutes)
routes.use('/genre', genreRoutes)
routes.use('/search', searchRoutes)

module.exports = routes 