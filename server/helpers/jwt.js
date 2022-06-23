const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const convertToToken = (payload) => {
  return jwt.sign(payload, secretKey);
};

const convertToPayload = (token) => {
  return jwt.verify(token, secretKey);
};

module.exports = { convertToToken, convertToPayload };
