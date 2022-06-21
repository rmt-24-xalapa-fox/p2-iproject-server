var jwt = require("jsonwebtoken");

function signToken(payload) {
  return jwt.sign(payload, "secretgachamon");
}

function verifyToken(token) {
  return jwt.verify(token, "secretgachamon");
}

module.exports = { signToken, verifyToken };
