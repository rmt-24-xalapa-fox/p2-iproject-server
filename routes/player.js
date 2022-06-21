const express = require('express')
const playerRouter = express.Router()
const playerController = require('../controllers/playerController')


playerRouter.get('/teams', playerController.getTeam)
playerRouter.get('/position', playerController.getPositions)
playerRouter.get('/category', playerController.getCategories)
playerRouter.get('/player', playerController.getPlayers)
playerRouter.get('/player/:id', playerController.getPlayerId)

module.exports = playerRouter
