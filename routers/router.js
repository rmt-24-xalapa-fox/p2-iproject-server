const routers = require('express').Router()
const marvel = require('./marvel-router')
// const authentication = require('../midlewares/authN')


routers.use('/marvel', marvel)

module.exports = routers