const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();
const errorHandler = require("../middlewares/errorHandle");

router.post("/register", Controller.registerController);

router.post("/login", Controller.loginController);

router.get("/mountains", Controller.mountainsController);

router.get("/mountains/:MountainId", Controller.mountainsByIdController);

router.use(errorHandler);

module.exports = router;
