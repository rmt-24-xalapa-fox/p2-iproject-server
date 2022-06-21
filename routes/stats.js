const router = require("express").Router()
const controllerStats = require("../controllers/controllerstats")

// route here
router.get('/', controllerStats.getStats)
router.get('/leaderboard', controllerStats.getLeaderboard)

// must login first
const authentication = require("../middlewares/clientauthentication")

router.get('/run/:userId', authentication, controllerStats.getUserRun)
router.post('/run/:userId', authentication, controllerStats.saveUserRun)
router.put('/run/:userId', authentication, controllerStats.finaliseUserRun)

router.use(require("../middlewares/errorHandler"))

module.exports = router