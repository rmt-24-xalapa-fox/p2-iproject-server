const express = require('express');
const UserController = require('../controllers/UserController');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');
const errorHandler = require('../middlewares/errorHandler');
const router = express.Router();

router.post("/register", UserController.register);
router.post('/login', UserController.login);
router.get("/product", UserController.readAllProduct);
router.use(authentication);
router.post("/product", UserController.createProduct);
router.use(authorization);
router.delete("/product/:id", UserController.deleteProduct);

router.use(errorHandler);

module.exports = router;