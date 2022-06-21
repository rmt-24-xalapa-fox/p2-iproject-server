const express = require("express");
const app = express();
const cors = require("cors");
const { errorHandler } = require("./middlewares/error_handler");
const port = 3000;
const router = require("./routers");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);
app.use(errorHandler);

app.listen(port, () => console.log(`Listening on port ${port}`));
module.exports = app;
