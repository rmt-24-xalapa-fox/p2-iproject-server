const routers = require('express').Router()
const marvel = require('./marvel-router')

routers.use('/marvel', marvel)

module.exports = routers