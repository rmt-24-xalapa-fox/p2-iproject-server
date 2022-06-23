const router = require("express").Router()
const novelRoute = require("./novelRoute")
const staffRoute = require("./staffRouter")
const customerRoute = require("./customerRoute")

router.use("/staff", staffRoute)
router.use("/customer", customerRoute)
router.use("/novel", novelRoute)

module.exports = router