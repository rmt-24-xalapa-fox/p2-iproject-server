const { convertToPayload } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "invalidToken" };
    }
    const payload = convertToPayload(access_token);
    const { id, name, email } = payload;
    const user = await User.findOne({
      where: {
        id,
        name,
        email,
      },
    });
    if (!user) {
      throw { name: "invalidToken" };
    }
    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
