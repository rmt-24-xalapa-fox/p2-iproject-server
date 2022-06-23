const express = require('express')
const router = express.Router()
const customerRouter = require('./user')
const playerRouter = require('./player')
const carduserRouter = require('./carduser')
const authentication = require('../middleware/authentication')

router.use('/', customerRouter)
router.use('/', playerRouter)
router.use(authentication)
router.use('/', carduserRouter)
module.exports = router