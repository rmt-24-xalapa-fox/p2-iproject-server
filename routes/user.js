const express = require('express')
const customerRouter = express.Router()
const customerController = require('../controllers/customerController')
const controllerAPI = require('../controllers/apiController')

customerRouter.get('/province', controllerAPI.getAPIprov)
customerRouter.get('/city/:id', controllerAPI.getAPIcity)
customerRouter.post(`/price`, controllerAPI.getPrice)
customerRouter.post('/register', customerController.registerCustomer)
customerRouter.post('/login', customerController.loginCustomer)

module.exports = customerRouter
