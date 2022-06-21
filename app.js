require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const Controller = require("./controller");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/register", Controller.register);
app.post("/login", Controller.login);
app.get("/", Controller.getPoem);
app.get("/read-more/:id", Controller.getDetail);
app.post("/create-poem", Controller.createPoem);

app.listen(port, () => {
  console.log(`Listening App ${port}`);
});
