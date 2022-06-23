const jwt = require("jsonwebtoken");
const secret = "secret100%";

function createToken(payload) {
  return jwt.sign(payload, secret);
}

function readPayload(token) {
  return jwt.verify(token, secret);
}

module.exports = { createToken, readPayload };
