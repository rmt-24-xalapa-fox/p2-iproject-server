const { readPayload } = require("../helpers");
const { User } = require("../models");

const authentication = async (req, res, next) => {
    try {
        const { access_token } = req.headers;
        const readToken = readPayload(access_token);
        const findUser = await User.findByPk(+readToken.id);
    
        if (!findUser) {
          throw { name: "INVALID_TOKEN" };
        }
        req.userId = +readToken.id;
        next()
      } catch (err) {
        next(err);
      }
}

module.exports = authentication