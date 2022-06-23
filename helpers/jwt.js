"use strict";
const jwt = require("jsonwebtoken");
const key = process.env.SECRET_KEY;

function jwtSign(payload) {
  return jwt.sign(payload, key, { expiresIn: "8h" });
}

function jwtConvert(token) {
  return jwt.verify(token, key);
}

module.exports = { jwtSign, jwtConvert };
