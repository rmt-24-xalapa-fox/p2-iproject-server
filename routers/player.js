const express = require('express')
const PlayerController = require('../controller/player')
const errorHandler = require('../middlewares/errorHandler')


const router = express.Router()

router.get('/player', (req, res) => {
    res.send('Hello Players!')
})

router.post('/player/register', PlayerController.playerRegistration)
router.post('/player/login', PlayerController.playerLogin)
router.get('/rentalan', PlayerController.readRentalan)
router.patch('/rentalan/:RentalanId/:UnitId', PlayerController.bookUnit)
router.use(errorHandler)

module.exports = router