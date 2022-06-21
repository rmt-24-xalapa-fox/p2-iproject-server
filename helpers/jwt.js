const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

function sign(payload) {
  return jwt.sign(payload, secretKey, {
    expiresIn: "24h",
  });
}

function verify(token) {
  return jwt.verify(token, secretKey);
}

module.exports = { sign, verify };
