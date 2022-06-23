
const express = require('express')
const router = express.Router();
const Controller= require('../controllers/history')
const {authorization} = require("../middlewares/auth");

router.get('/',authorization ,Controller.getHistory)

module.exports=router;