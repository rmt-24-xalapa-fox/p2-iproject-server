"use strict";
const jwt = require("jsonwebtoken");
const key = process.env.SECRET_KEY;

function tokenUser(data) {
  return jwt.sign(data, key);
}

function checkToken(data) {
  return jwt.verify(data, key);
}

module.exports = {
  tokenUser,
  checkToken,
};
