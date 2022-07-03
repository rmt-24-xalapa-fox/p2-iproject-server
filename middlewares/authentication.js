const { User } = require("../models");
const { convertTokenToPayload } = require("../helpers/jwt");

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "Invalid token" };
    }
    const payload = convertTokenToPayload(access_token);
    const { id } = payload;
    const user = await User.findByPk(id);
    if (!user) {
      throw { name: "Invalid token" };
    }
    req.user = {
      id: user.id,
      name: user.name,
      plan: user.plan,
    };
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = authentication;
