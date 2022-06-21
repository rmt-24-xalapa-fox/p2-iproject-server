const express = require(`express`)
const carduserRouter = express.Router()
const carduserController = require('../controllers/carduserController')

carduserRouter.get('/carduser', carduserController.getCardUser)
carduserRouter.post('/carduser/:playerId', carduserController.postCardUser)
module.exports = carduserRouter
