const express = require('express')
const PlayerController = require('../controller/player')
const errorHandler = require('../middlewares/errorHandler')
const FacebookStrategy = require('passport-facebook').Strategy


const router = express.Router()

router.get('/player', (req, res) => {
    res.send('Hello Players!')
})


router.post('/player/register', PlayerController.playerRegistration)
router.post('/player/login', PlayerController.playerLogin)
router.get('/rentalan', PlayerController.readRentalan)
router.get('/rentalan/:id', PlayerController.readRentalanById)
router.patch('/rentalan/:UnitId', PlayerController.bookUnit)
router.use(errorHandler)

module.exports = router