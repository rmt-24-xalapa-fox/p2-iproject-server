const express = require('express')
const PlayerController = require('../controller/player')


const router = express.Router()

router.get('/player', (req, res) => {
    res.send('Hello Players!')
})

router.get('/rentalan', PlayerController.readRentalan)

module.exports = router