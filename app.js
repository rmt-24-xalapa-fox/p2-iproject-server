require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const Controller = require("./controller");
const authentication = require("./middlewares/authentication");
const errorHandler = require("./middlewares/errorHandler");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/register", Controller.register);
app.post("/login", Controller.login);

app.use(authentication)

app.get("/", Controller.getPoem);
app.get("/read-more/:id", Controller.getDetail);
app.get("/my-poem/:id", Controller.getMyPoem);
app.post("/create-poem", Controller.createPoem);

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Listening App ${port}`);
});
