if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const router = require("./routing");
const app = express();
const cors = require("cors");

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use("/", router);

module.exports = app;
