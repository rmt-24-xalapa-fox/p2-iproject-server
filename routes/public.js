const router = require("express").Router();
const publicController = require("../controllers/publicController");
const { authorization, adminOnly } = require("../middlewares/authorization");
const authentication = require("../middlewares/authentication");
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage()})


router.post('/register', publicController.register)
router.post('/login', publicController.login)
router.get('/report', publicController.getAllReport)
router.post('/upload',upload.single('image'), publicController.uploadImage)

router.use (authentication)

router.post('/report', upload.single('avatar'), publicController.createReport)
router.get('/report/:id', publicController.getReportById)

router.get('/myReport', publicController.getMyReport)

module.exports = router;