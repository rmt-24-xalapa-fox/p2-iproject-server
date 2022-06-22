const express = require(`express`)
const carduserRouter = express.Router()
const carduserController = require('../controllers/carduserController')

carduserRouter.get('/carduser', carduserController.getCardUser)
carduserRouter.get('/userdata', carduserController.getUser)
carduserRouter.get('/history', carduserController.historyCard)
carduserRouter.put(`/updateuser`, carduserController.updateUser)
carduserRouter.post('/carduser/:playerId', carduserController.postCardUser)
carduserRouter.delete(`/carduser/:id`, carduserController.removeCart)
module.exports = carduserRouter
