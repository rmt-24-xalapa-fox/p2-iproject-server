const { verifyToken } = require("./jwt");
const { User, MyDigimon } = require("../models");

const authentication = async (req, res, next) => {
  try {
    // console.log("masok");
    const access_token = req.headers.access_token;
    // console.log(access_token);
    if (!access_token) {
      throw { name: "InvalidToken" };
    }

    const payload = verifyToken(access_token);
    // console.log(payload);
    const foundUser = await User.findOne({
      where: {
        id: payload.id,
      },
    });
    // console.log(foundUser);
    if (!foundUser) {
      throw { name: "InvalidToken" };
    }
    req.user = {
      id: payload.id,

      role: payload.id,
    };
    // console.log("masok 2");
    next();
  } catch (err) {
    if (err.name == "InvalidToken" || err.name == "JsonWebTokenError") {
      res.status(401).json({ message: "Invalid token" });
    } else {
      res.status(500).json(err);
    }
  }
};

module.exports = authentication;
