const express = require('express')
const Controller = require('../controllers/controller')
const authentication = require('../middlewares/authentication')
const router = express.Router()
const errorHandler = require('../middlewares/errorHandler')

router.post('/registercompany', Controller.registerCompany)
router.post('/registeruser', Controller.registerUser)
router.post('/loginuser', Controller.loginuser)
router.post('/logincompany', Controller.logincompany)

router.use(authentication)

router.get('/users', Controller.getcompanyusers)
router.patch('/users/:userId', Controller.asignadmin)
router.get('/ticket', Controller.ticketslist)
router.post('/ticket', Controller.createticket)
router.patch('/ticket/:ticketId', Controller.updateticket)
router.get('/task', Controller.fetchtask)
router.get('/completedtask', Controller.fetchcompletedtask)
router.post('/sendinvite', Controller.sendinvite)

router.use(errorHandler)

module.exports = router