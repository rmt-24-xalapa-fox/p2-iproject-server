const bcrypt = require("bcryptjs/dist/bcrypt");

function comparePw(pwInput, pwReal) {
  const passwordTrue = bcrypt.compareSync(pwInput, pwReal);
  return passwordTrue
}

module.exports = comparePw;
