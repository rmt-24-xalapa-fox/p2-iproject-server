const router = require("express").Router();
const UserController = require("../controllers/UserController");
const PaletteController = require("../controllers/PaletteController");
const authentication = require("../middlewares/authentication");
const errorHandler = require("../middlewares/errorHandler");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/register",
  upload.single("profilePicture"),
  UserController.register
);
router.post("/login", UserController.login);
router.use(authentication);
router.get("/palettes", PaletteController.readAllPalettes);
router.get("/palettes/generate", PaletteController.generatePalette);
router.post("/palettes/add", PaletteController.addPalette);
router.get("/palettes/:colorPaletteId", PaletteController.readPaletteById);
router.get("/profile", UserController.readUserById);
router.patch(
  "/profile/edit",
  upload.single("profilePicture"),
  UserController.editUserById
);
router.post("/profile/tokenUpgrade", UserController.createSnapToken);
router.patch("/profile/upgradePlan", UserController.upgradePlan);
router.use(errorHandler);

module.exports = router;
