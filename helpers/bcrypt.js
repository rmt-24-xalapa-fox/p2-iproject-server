"use strict";
const bcrypt = require("bcryptjs");

function bcryptHash(password) {
  return bcrypt.hashSync(password);
}

function bcryptCompare(password, dbpassword) {
  return bcrypt.compareSync(password, dbpassword);
}

module.exports = { bcryptHash, bcryptCompare };
