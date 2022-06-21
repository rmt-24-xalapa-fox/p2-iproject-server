const { User } = require("../models");
const { convertToken } = require("../helpers/jwt");

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "Invalid token" };
    }

    const payload = convertToken(access_token);
    const { id } = payload;
    const user = await User.findByPk(+id);

    if (!user) {
      throw { name: "Invalid token" };
    }

    req.user = {
      id: user.id,
    };
    next();
  } catch (err) {
    if (err.name === "Invalid token" || err.name === "JsonWebTokenError") {
      res.status(401).json({
        message: "Invalid token",
      });
    } else {
      res.status(500).json({
        message: "ISE",
      });
    }
  }
}

module.exports = authentication;
