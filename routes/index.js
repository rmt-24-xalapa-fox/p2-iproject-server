const router = require("express").Router();
const Controller = require("../controllers/controller");
const authentication = require("../middlewares/authentication");
const errorHandler = require("../middlewares/errorHandler");

router.get("/register", Controller.register);
router.get("/login", Controller.login);
router.post("/google-sign", Controller.googleSign);
router.get("/books", Controller.readBooks);
router.get("/books/:id", Controller.readOneBook);
router.get("/categories", Controller.readCategories);

router.use(authentication);

router.get("/wishlists", Controller.readWishlists);
router.post("/wishlists/:BookId", Controller.addWishlists);
router.delete("/wishlists/:BookId", Controller.removeWishlists);

router.get("/carts", Controller.readCarts);
router.post("/carts/:BookId", Controller.addCarts);
router.delete("/carts/:BookId", Controller.removeCarts);

router.use(errorHandler);

module.exports = router;
