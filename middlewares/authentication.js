"use strict";

const { convertTokenToPayload } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: `InvalidToken` };
    }

    const payload = convertTokenToPayload(access_token);
    const { id } = payload;
    const user = await User.findByPk(id);

    if (!user) {
      throw { name: `InvalidToken` };
    }

    req.user = {
      id: user.id,
      role: user.role
    };

    console.log(`ini di authentication bawah`)

    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = authentication;
