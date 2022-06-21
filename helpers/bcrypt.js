"use strict";
const bcrypt = require("bcryptjs");

function hashPassword(password) {
  return bcrypt.hashSync(password, 8);
}

function comparePass(input, password) {
  return bcrypt.compareSync(input, password);
}

module.exports = {
  hashPassword,
  comparePass,
};
