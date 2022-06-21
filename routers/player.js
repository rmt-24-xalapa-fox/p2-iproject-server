const express = require('express')
const PlayerController = require('../controller/player')


const router = express.Router()

router.get('/player', (req, res) => {
    res.send('Hello Players!')
})

router.post('/player/register', PlayerController.playerRegistration)
router.post('/player/login', PlayerController.playerLogin)
router.get('/rentalan', PlayerController.readRentalan)
router.patch('rentalan/:RentalanId/:UnitId', PlayerController.bookUnit)

module.exports = router