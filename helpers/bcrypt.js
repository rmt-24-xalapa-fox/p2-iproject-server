const bcrypt = require("bcryptjs");

function hashPass(password) {
  const hash = bcrypt.hashSync(password);
  return hash;
}

function comparePass(password, hashed) {
  const compared = bcrypt.compareSync(password, hashed);
  return compared;
}

module.exports = { hashPass, comparePass };
