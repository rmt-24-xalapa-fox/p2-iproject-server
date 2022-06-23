require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", require("./routers"));

app.listen(port, () => {
  console.log("listening to port " + port);
});

module.exports = app;
