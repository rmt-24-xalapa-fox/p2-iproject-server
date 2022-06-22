const { getPayload } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    console.log(access_token)
    if (!access_token) {
      throw { name: "InvalidToken" };
    }
    const payload = getPayload(access_token);
    const { id } = payload;
    // console.log(id)
    const user = await User.findByPk(id);
    // console.log(user)
    if (!user) {
      throw { name: "InvalidToken" };
    }
    req.user = {
      id: user.id
    };
    next();
  } catch (err) {
    console.log(err)
    next(err)
  }
};

module.exports = authentication;
