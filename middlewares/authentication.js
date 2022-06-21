const { convertTokenToPayload } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers;

    if (!access_token) {
      throw { msg: "Invalid token", code: 401 };
    }

    const payload = convertTokenToPayload(access_token);
    const { id } = payload;

    const user = await User.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw { msg: "Invalid token", code: 401 };
    }

    req.user = {
      id: user.id,
    };

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = authentication;
