var bcrypt = require("bcryptjs");

function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}

function comparePassword(password, passwordDb) {
  return bcrypt.compareSync(password, passwordDb);
}

module.exports = { hashPassword, comparePassword };
