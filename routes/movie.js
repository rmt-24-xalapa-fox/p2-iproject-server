const router = require("express").Router();
const movieController = require("../controllers/movieController");
const authentication = require("../middleware/authentication");

router.get("/", movieController.getPopularMovie);
router.get("/trending", movieController.getTrendingMovie);
router.get("/top", movieController.getTopMovie);
router.get("/:movieId", movieController.getMovieDetail);
router.post("/:movieId", authentication, movieController.addTransaction);

module.exports = router;