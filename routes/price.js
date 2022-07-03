const router = require("express").Router();
const movieController = require("../controllers/movieController");

router.get("/", movieController.getPrice);
module.exports = router;