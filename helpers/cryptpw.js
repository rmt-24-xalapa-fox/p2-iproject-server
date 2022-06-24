const bcrypt = require("bcryptjs")

function generatePW(pw) {
  let salt = bcrypt.genSaltSync(8);
  return bcrypt.hashSync(pw, salt);
}

function isPwCorrect(userpw, pwhash) {
  return bcrypt.compareSync(userpw, pwhash)
}

module.exports = { generatePW, isPwCorrect }