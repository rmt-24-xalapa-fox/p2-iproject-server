
const express = require('express')
const router = express.Router();
const UserController= require('../controllers/UserController')
const {authentication} = require("../middlewares/auth");

router.post('/login',UserController.login)
router.post('/loginGoogle',UserController.loginGoogle)
router.post('/register', UserController.registerCustomer)
router.post('/registerAdmin', UserController.register)

router.use(authentication);

router.get('/coinPrice', UserController.getCoin)
router.post('/buyCoin/:id', UserController.buyCoin)
router.post('/giftCoin/:id', UserController.giftCoin)

router.post('/addPrice', UserController.addCoinPrices)

module.exports=router;