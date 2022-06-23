require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routers");
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
