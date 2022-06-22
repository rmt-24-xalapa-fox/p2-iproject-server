const router = require("express").Router();
const Controller = require("../controllers/controller");
const authentication = require("../middlewares/authentication");
const errorHandler = require("../middlewares/errorHandler");

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.post("/google-sign", Controller.googleSign);
router.get("/books", Controller.readBooks);
router.get("/books/:id", Controller.readOneBook);
router.get("/categories", Controller.readCategories);

router.use(authentication);

router.get("/shipping/cities", Controller.readCities);
router.post("/shipping/costs", Controller.addShipping);

router.get("/wishlists", Controller.readWishlists);
router.post("/wishlists/:BookId", Controller.addWishlists);
router.delete("/wishlists/:BookId", Controller.removeWishlists);

router.get("/carts", Controller.readCarts);
router.delete("/clearCarts", Controller.clearCarts);
router.post("/carts/:BookId", Controller.addCarts);
router.delete("/carts/:BookId", Controller.removeCarts);

router.post("/pay", Controller.createPayment);
router.get("/orders", Controller.readOrders);
router.post("/orders", Controller.addOrder);

router.use(errorHandler);

module.exports = router;
