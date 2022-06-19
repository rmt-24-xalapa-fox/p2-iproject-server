"use strict";

const { Controller } = require("../controllers/controller");
const router = require("express").Router();
const errorHandler = require("../middlewares/errorHandlers");

router.use("/products", require("./products"));
router.use("/categories", require("./categories"));
router.use("/ingredients", require("./ingredients"));
router.use("/recipes", require("./recipes"));
router.use("/sales", require("./sales"));

router.use(errorHandler);

router.module.exports = router;
