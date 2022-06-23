const bcrypt = require("bcryptjs");

function encryptPassword(password) {
  return bcrypt.hashSync(password);
}

function decryptPassword(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}

module.exports = { encryptPassword, decryptPassword };
