const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();
const errorHandler = require("../middlewares/errorHandle");
const authentication = require("../middlewares/authentication");

router.post("/register", Controller.registerController);

router.post("/login", Controller.loginController);

router.post("/gsignin", Controller.googleSignIn);

router.get("/weather", Controller.weather);

router.get("/mountains", Controller.mountainsController);

router.get("/mountains/:MountainId", Controller.mountainsByIdController);

router.use(authentication);

router.post("/midtrans/:LicenseId", Controller.midtransController);

router.get("/licenses", Controller.licensesController);

router.patch("/licenses/pay/:LicenseId", Controller.patchLicenseController);

router.delete("/licenses/:LicenseId", Controller.deleteLicenses);

router.post("/licenses/:MountainId/:QuotaId", Controller.postLicenseController);

router.patch("/quota/:QuotaId", Controller.patchQuotaController);

router.use(errorHandler);

module.exports = router;
