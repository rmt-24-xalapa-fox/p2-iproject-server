const express = require('express')
const Controller = require('../controller/controller')
const authentication = require('../middlewares/authentication')
const errorHandler = require('../middlewares/errorHandler')
const router = express.Router()

router.get('/', Controller.getAllProducts)
router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.get('/product/:ProductId', Controller.getOneProduct)

router.use(authentication)

router.get('/user/wishlist', Controller.getWishlists)
router.post('/user/wishlist', Controller.addWishlist)

router.get('/user/cart', Controller.getCart)
router.post('/user/cart', Controller.addCart)

router.post('/user/transaction', Controller.getTokenTransaction)

router.use(errorHandler)

module.exports = router