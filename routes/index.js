// const Controller = require("../controllers/controller");
// const authentication = require("../middlewares/authentication");
// const { authorization, historyAuthorization } = require("../middlewares/authorization");
const errorHandler = require("../middlewares/errorHandler");

const router = require("express").Router();

router.get(`/`, (req, res) => {
  res.status(200).json({ message: 'halozz' })
});

router.use("/admin", require("./admin"))
router.use("/public", require("./public"))



router.use(errorHandler);

module.exports = router;
