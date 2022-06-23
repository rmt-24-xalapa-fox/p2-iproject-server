const router = require("express").Router();
const movieController = require("../controllers/movieController");
const { authentication } = require("../middleware/authentication");

router.patch("/:orderId", authentication, movieController.patchTransaction);

module.exports = router;