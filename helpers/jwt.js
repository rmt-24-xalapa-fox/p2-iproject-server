const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

function convertPayloadToToken(payload) {
  return jwt.sign(payload, secretKey, {
    expiresIn: "365d",
  });
}

function convertTokenToPayload(token) {
  return jwt.verify(token, secretKey);
}

module.exports = {
  convertPayloadToToken,
  convertTokenToPayload,
};
