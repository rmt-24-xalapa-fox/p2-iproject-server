const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();
const errorHandler = require("../middlewares/errorHandle");
const authentication = require("../middlewares/authentication");

router.post("/register", Controller.registerController);

router.post("/login", Controller.loginController);

router.get("/mountains", Controller.mountainsController);

router.get("/mountains/:MountainId", Controller.mountainsByIdController);

router.use(authentication);

router.get("/licenses", Controller.licensesController);

router.post("/licenses/:MountainId", Controller.postLicenseController);

router.patch("/quota/:QuotaId/:QuotaUse", Controller.patchQuotaController);

router.use(errorHandler);

module.exports = router;
