"use strict";
const router = require("express").Router();
const UserController = require("../controllers/userController");
const EventController = require("../controllers/eventController");
const authentication = require("../middlewares/authentication");
const errorHandler = require("../middlewares/errorHandler");

router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.get("/event", EventController.getAllEvent);
router.use(authentication);
router.post("/event", EventController.createEvent);
router.put("/event/:id", EventController.updateEvent);
router.get("/myevent", EventController.getMyEvent);
router.post("/myevent/:id", EventController.attendEvent);
router.delete("/myevent/:id", EventController.unattendEvent);

router.use(errorHandler);

module.exports = router;
