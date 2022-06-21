const router = require("express").Router();
const UserController = require("../controllers/usercontroller");
const authentication = require("../middlewares/authentication");
const errorHandler = require("../middlewares/errorhandler");

router.post("/login", UserController.login);
router.post("/register", UserController.register);

router.use(errorHandler);

module.exports = router;
