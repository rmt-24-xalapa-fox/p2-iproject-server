const router = require("express").Router();
const Controller = require("../controllers/controller");
const authentication = require("../middlewares/authentication");
const errorHandler = require("../middlewares/errorHandler");

router.get("/register", Controller.register);

router.use(errorHandler);

module.exports = router;
