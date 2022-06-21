const jwt = require("jsonwebtoken")
const secretKey = process.env.SECRET_KEY

function convertToToken(data) {
  // console.log(data);
  // return jwt.sign(data, secretKey, { expiresIn: "1h" })
  return jwt.sign(data, secretKey, {})
}

function convertToken(token) {
  return jwt.verify(token, secretKey)
}

module.exports = { convertToToken , convertToken}