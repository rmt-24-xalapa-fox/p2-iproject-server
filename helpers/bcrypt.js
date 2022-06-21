const bcrypt = require("bcryptjs");

function hash(pass, salt) {
  return bcrypt.hashSync(pass, salt);
}

function comparePassword(receivedPassword, userPassword) {
  return bcrypt.compareSync(receivedPassword, userPassword);
}

module.exports = { hash, comparePassword };
