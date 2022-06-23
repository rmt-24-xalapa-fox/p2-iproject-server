'use strict'

const userRouters = require('express').Router()
// const userController = require('../controllers/userController')
const user_controller = require('../controllers/userController')

// //* Login & Register
// userRouters.post('/register', user_controller.register)
// userRouters.post('/login', user_controller.register)
// userRouters.post('/login-google', user_controller.googleLogin)


module.exports = userRouters