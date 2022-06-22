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

// app.use(async (req, res, next) => {
//   try {
//     const access_token = req.headers.access_token;
//     if (!access_token) {
//       throw { name: "InvalidToken" };
//     }

//     const payload = verifyToken(access_token);

//     const foundUser = await User.findOne({
//       where: {
//         id: payload.id,
//         role: payload.id,
//       },
//     });

//     if (!foundUser) {
//       throw { name: "InvalidToken" };
//     }
//     req.user = {
//       id: payload.id,
//     };
//     // console.log(payload.id);
//     next();
//   } catch (err) {
//     if (err.name == "InvalidToken" || err.name == "JsonWebTokenError") {
//       res.status(401).json({ message: "Invalid token" });
//     } else {
//       res.status(500).json(err);
//     }
//   }
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
