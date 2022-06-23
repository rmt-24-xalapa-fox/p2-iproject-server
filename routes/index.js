const router = require("express").Router();
const UserController = require("../controllers/usercontroller");
const PetController = require("../controllers/petcontroller");
const authentication = require("../middlewares/authentication");
const errorHandler = require("../middlewares/errorhandler");

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.get("/user/:id", UserController.getUserDetail); // see your profile
router.post("/user/:id"); // update your profile. needs authorization
router.get("/pets", PetController.listAllPets);
router.get("/pets/:id", PetController.getPetDetail);
router.put("/pets/:id", PetController.UpdatePetDetails); // has to be owner
router.post("/pets", PetController.addPet);

// get & post pet

router.use(errorHandler);

module.exports = router;
