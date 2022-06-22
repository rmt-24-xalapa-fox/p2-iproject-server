"use strict";
const { jwtConvert } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    if (!access_token) {
      throw { name: "InvalidToken" };
    }

    const payload = jwtConvert(access_token);
    const { id } = payload;
    const user = await User.findByPk(id);

    if (!user) {
      throw { name: "InvalidToken" };
    }

    req.user = {
      id: user.id,
      email: user.email,
    };

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
