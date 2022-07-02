const express = require("express")
const router = express.Router()
const {Controller} = require("../Controller/index.js")
const { authentif } = require("../middleware/autentif.js")

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.post('/loginGoogle', Controller.loginGoogle)


router.use(authentif)

router.post('/tokenpayment', Controller.getTokenPayment)
router.get('/getsong', Controller.getallSong)
router.get('/top10radio', Controller.top10radio)
router.patch('/userstatus', Controller.changeStatus)







module.exports = router