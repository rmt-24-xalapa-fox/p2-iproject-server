const bcrypt = require("bcryptjs");

function hashPassword(password) {
  return (hash = bcrypt.hashSync(password, 5));
}

function verifyPassword(enteredPassword, hash) {
  return bcrypt.compareSync(enteredPassword, hash);
}

module.exports = { hashPassword, verifyPassword };
