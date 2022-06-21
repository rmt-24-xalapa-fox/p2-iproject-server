"use strict";
const express = require("express");
const apiRoute = express.Router();
const ApiController = require("../controllers/apiController");

apiRoute.get("/heroes", ApiController.getHero);
apiRoute.get("/roles", ApiController.getRoles);
apiRoute.get("/heroes/:id", ApiController.getHeroDetail);
apiRoute.get("/roles/:role", ApiController.getHeroByRole);

module.exports = apiRoute;
