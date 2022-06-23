const { Controller } = require("../controllers/controller");
const routes = require("express").Router();

routes.post("/register", Controller.register);
routes.post("/login", Controller.login);
routes.post("/post", Controller.createPost);

routes.use(errorHandler);

module.exports = routes;
