const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();

router.post("/register", Controller.newUser);
router.post("/login", Controller.loginUser);



module.exports = router;
