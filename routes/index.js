const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const { barberAuthentication, customerAuthentication } = require('../middlewares/authentication')
const errorHandler = require('../middlewares/errorHandler')


router.post('/registerCustomer', Controller.registerationCustomer)
router.post('/registerBarber', Controller.registerationBarber)
router.post('/loginCustomer', Controller.loginCustomer)
router.post('/loginBarber', Controller.loginBarber)
router.post('/customerGoogle-login', Controller.googleLoginCustomer)

router.get('/customer/transactions', customerAuthentication, Controller.getTransactions) // ini utk dptin transaksi" status
router.get('/customer/barbers', customerAuthentication, Controller.getBarbers) // ini utk dptin barbers
router.get('/customer/favorite', customerAuthentication, Controller.getFavorites) //ini utk dptin favorite
router.post('/customer/favorite/:BarberId', customerAuthentication, Controller.addFavorites) //ini utk tambah favorite
router.post('/customer/transaction/:BarberId', customerAuthentication, Controller.addTransaction) //ini utk bikin janjian


router.get('/barber/transactions', barberAuthentication, Controller.barberTransactions) // liat 
router.put('/barber/price', barberAuthentication, Controller.updateBarberPrice) // ganti harga
router.put('/barber/updateStatus/:transId', barberAuthentication, Controller.barberUpdateStatus) //ganti status

router.use(errorHandler)


module.exports = router