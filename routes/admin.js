const router = require("express").Router();
const adminController = require("../controllers/adminController");
const { authorization, adminOnly } = require("../middlewares/authorization");
const authentication = require("../middlewares/authentication");
const nodemailer = require("nodemailer");

router.post('/register', adminController.register)
router.post('/login', adminController.login)

router.use (authentication)

router.patch(`/:id`, authorization, adminController.setStatus);
router.put(`/:id`, authorization, adminController.editReportById);

// router.put(`/:id`, authorization, Controller.editNewsById);
// router.patch(`/:id`, authorization, adminOnly, Controller.setNewsStatus);

// router.get('/news', adminController.getAllNews)
// router.get('/news/:id', adminController.getNewsById)

// router.post('/bookmark', adminController.addBookmark)
// router.get('/bookmark', adminController.getBookmark)

module.exports = router;
