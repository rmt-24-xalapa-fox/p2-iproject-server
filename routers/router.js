const routers = require('express').Router()
const marvel = require('./marvel-router')
const user_router = require('./user-router')
// const authentication = require('../midlewares/authN')


// routers.use('/users', user_router)
routers.use('/marvel', marvel)



module.exports = routers