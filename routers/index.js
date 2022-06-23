const { Controller } = require("../controllers/controller");
const errorHandler = require("../helpers/errorhandler");
const authentication = require("../middlewares/authentication");
const routes = require("express").Router();

routes.post("/register", Controller.register);
routes.post("/login", Controller.login);
routes.post("/post", authentication, Controller.createPost);

routes.use(errorHandler);

module.exports = routes;
