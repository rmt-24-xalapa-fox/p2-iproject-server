"use strict";

const router = require("express").Router();
const errorHandler = require("../middlewares/errorHandlers");

router.use("/products", require("./products"));
router.use("/categories", require("./categories"));
router.use("/sales", require("./sales"));

router.use(errorHandler);

module.exports = router;
