const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const hashPassword = (value) => {
  return (hash = bcrypt.hashSync(value));
};

const comparePassword = (value, check) => {
  return (checkedPassword = bcrypt.compareSync(value, check));
};

const generateToken = (payload) => {
  return jwt.sign(payload, secretKey);
};

const readPayload = (token) => {
  return jwt.verify(token, secretKey);
};

module.exports = { hashPassword, comparePassword, generateToken, readPayload };
