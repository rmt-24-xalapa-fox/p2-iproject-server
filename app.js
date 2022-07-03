require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const Controller = require("./controllers/controller");
const authentication = require("./helpers/authentication");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/register", Controller.register);
app.post("/login", Controller.login);

app.get("/digimonList", Controller.fetchDataDigimon);

app.use(authentication);

app.put("/user/gachaDigimon", Controller.gachaDigimon);
app.get("/user/gachaCoin", Controller.fetchCoin);
app.get("/user/myDigimon", Controller.fetchMyDigimon);
app.get("/user/referralCode", Controller.fetchReferralData);
app.put("/user/sellDigimon/:myDigimonId", Controller.sellDigimon);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
