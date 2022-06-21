const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const Controller = require("./controllers/controller");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", Controller.indexTes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
