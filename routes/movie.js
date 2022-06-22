const router = require("express").Router();
const movieController = require("../controllers/movieController");
const authentication = require("../middlewares/authentication");

router.get("/", movieController.getPopularMovie);
router.get("/:movieId", movieController.getMovieDetail);
router.post("/:movieId", authentication, movieController.addTransaction);

module.exports = router;