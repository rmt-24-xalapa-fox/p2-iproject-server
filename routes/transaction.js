const router = require("express").Router();
const movieController = require("../controllers/movieController");
const authentication = require("../middlewares/authentication");

router.get("/", authentication, movieController.getTransaction);
router.post("/:orderId", authentication, movieController.generateOrder);

module.exports = router;