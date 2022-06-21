const express = require('express')
const OpController = require('../controller/operator')

const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello Routers!')
})

router.post('/unit/:RentalanId', OpController.addUnit)

router.get('/unit', OpController.readUnit)

module.exports = router