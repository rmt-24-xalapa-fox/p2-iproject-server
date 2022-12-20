const { tokenToPayload } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers;

    if (!access_token) {
      throw { name: "Invalid Token" };
    }

    const payload = tokenToPayload(access_token);

    const isusernameExist = await User.findOne({
      where: { username: payload.username },
    });

    if (!isusernameExist) {
      throw { name: "Invalid Token" };
    }

    req.user = {
      id: isusernameExist.id,
      role: isusernameExist.role,
      username: isusernameExist.username,
    };

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = authentication;
