const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

function convertPayloadToToken(data) {
  return jwt.sign(data, secretKey);
  // jika ingin ada expired nya tambahkan {expiresIn: "1h"}
}

function verifyToken(data) {
  return jwt.verify(data, secretKey);
}

module.exports = { convertPayloadToToken, verifyToken };
