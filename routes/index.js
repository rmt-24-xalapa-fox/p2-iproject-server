"use strict";

const express = require('express');
const errorHandler = require('../middlewares/errorHandler');
const router = express.Router();
// const ProductCon = require('../controllers/productController');


// const authentication = require('../middlewares/authentication');
// const authorization = require('../middlewares/authorization');
// const errorHandler = require('../middlewares/errorHandler');
const customerRouter = require('./customerRouter');
const userRouter = require("./userRouter");
const api3rdparty = require("./api3rdPartyRoute");
// const productRouter = require('./productRouter');

router.use('/customer', customerRouter);
router.use('/admin', userRouter);
router.use('/api3rdparty', api3rdparty);
// router.use('/product', productRouter);


module.exports = router;