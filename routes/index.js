const router = require("express").Router()
const ControllerAccount = require("../controllers/controlleraccount")

router.post('/login', ControllerAccount.login)

router.use('/battle', require('./battle'))
router.use('/stats', require('./stats'))

// error handler
router.use(require("../middlewares/errorHandler"))

module.exports = router