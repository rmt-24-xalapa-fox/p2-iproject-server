
const express = require('express')
const router = express.Router();

const user = require('./user')
// const history = require('./histories')
const posts = require('./posts')
const {authentication} = require("../middlewares/auth");

router.use("/users",user);

router.use("/",posts);

// router.use("/",movie)

// router.use(authentication);
// router.use("/history",history)


module.exports=router;