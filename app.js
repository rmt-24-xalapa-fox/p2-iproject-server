"use strict"
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const routes = require("./routes");
const PORT = process.env.PORT || 3000;
const errorHandler = require("./middleware/errorHandler");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", routes);
app.use(errorHandler);

// app.get("/", (req, res, next) => {
//   res.status(200).json({ message: "server runing" });
// });

app.listen(PORT, () => {
    console.log("Listening now at", PORT);
});