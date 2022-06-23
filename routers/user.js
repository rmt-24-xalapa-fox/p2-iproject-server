
const express = require('express')
const router = express.Router();
const UserController= require('../controllers/UserController')
const {authentication} = require("../middlewares/auth");
const PaymentController= require('../controllers/PaymentController')

router.post('/login',UserController.login)
router.post('/loginGoogle',UserController.loginGoogle)
router.post('/register', UserController.registerCustomer)
router.post('/registerAdmin', UserController.register)

router.use(authentication);

router.get('/coinPrice', UserController.getCoin)

router.post('/getLink/:id', PaymentController.generateUrl)
router.post('/buyCoin/:id', UserController.buyCoin)
router.post('/giftCoin/:id', UserController.giftCoin)

router.post('/addPrice', UserController.addCoinPrices)

router.get('/following', UserController.getFollowing)
router.post('/follow/:id', UserController.follow)
router.delete('/follow/:id', UserController.deleteFollow)
module.exports=router;