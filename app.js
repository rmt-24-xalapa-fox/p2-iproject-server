"use strict";
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", require("./routers/index"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
