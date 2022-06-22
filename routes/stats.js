const router = require("express").Router()
const controllerStats = require("../controllers/controllerstats")

// route here
router.get('/', controllerStats.getStats)
router.get('/leaderboard', controllerStats.getLeaderboard)

// must login first
router.use(require("../middlewares/authentication"))

router.get('/run/:userId', controllerStats.getUserRun)
router.post('/run/:userId', controllerStats.saveUserRun)
router.put('/run/:userId', controllerStats.finaliseUserRun)

module.exports = router