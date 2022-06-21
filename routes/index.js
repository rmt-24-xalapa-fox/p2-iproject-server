const router = require("express").Router();
const UserController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");
const errorHandler = require("../middlewares/errorHandler");
const fetch = require('node-fetch')

router.post("/register", UserController.register);

router.post("/login", UserController.login);

router.post("/google-sign", UserController.googleLogin);

router.get('/products', (req, res) => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => res.status(200).json(json))
      .catch((err) => {
        res.status(500).json({
          message: "ISE",
        });
      });
})

router.use(authentication);

router.use(errorHandler);

module.exports = router;
