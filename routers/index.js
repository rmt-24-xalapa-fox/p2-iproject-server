const router = require("express").Router();
const Controller = require("../controllers");
const authentication = require("../middlewares/authentication");
const errorHandler = require("../middlewares/errorHandler");

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.use(authentication);
router.get("/palettes", Controller.readAllPalettes);
router.post("/palettes/add", Controller.addPalette);
router.get("/palettes/:colorPaletteId", Controller.readPaletteById);
router.use(errorHandler);

module.exports = router;
