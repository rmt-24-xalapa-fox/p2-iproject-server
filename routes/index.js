'use strict'

const routes = require('express').Router()

const userRoutes = require('./user')
const movieRoutes = require('./movie')
const actorRoutes = require('./actor')

routes.use('/user', userRoutes)
routes.use('/movie', movieRoutes)
routes.use('/actor', actorRoutes)

module.exports = routes 