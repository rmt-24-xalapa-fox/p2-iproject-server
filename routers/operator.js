const express = require('express')
const OpController = require('../controller/operator')
const errorHandler = require('../middlewares/errorHandler')

const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello Routers!')
})

router.post('/oplogin', OpController.operatorLogin)
router.post('/unit/:RentalanId', OpController.addUnit)
router.get('/unit/:RentalanId', OpController.readUnit)
router.patch('/unit/:RentalanId/:UnitId', OpController.editUnit)
router.delete('/unit/:RentalanId/:UnitId', OpController.deleteUnit)
router.use(errorHandler)

module.exports = router