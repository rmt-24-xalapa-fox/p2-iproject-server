const router = require("express").Router()
const controllerStats = require("../controllers/controllerstats")

// route here
router.get('/', controllerStats.getStats)
router.get('/leaderboard', controllerStats.getLeaderboard)

// must login first
router.use(require("../middlewares/authentication"))

router.get('/run/ongoing', controllerStats.getUserRun)
router.post('/run/save', controllerStats.saveUserRun)
router.patch('/run/finalize', controllerStats.finaliseUserRun)

module.exports = router