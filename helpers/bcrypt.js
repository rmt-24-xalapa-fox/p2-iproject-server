const bcrypt = require("bcryptjs");

function hashPassword(input) {
  const hash = bcrypt.hashSync(input, 8);
  return hash;
}

function checkPassword(input, hash) {
  const isValid = bcrypt.compareSync(input, hash);
  return isValid;
}

module.exports = {
  hashPassword,
  checkPassword,
};
