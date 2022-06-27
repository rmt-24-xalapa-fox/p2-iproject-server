var jwt = require("jsonwebtoken");

function generateJWToken(userData) {
  var token = jwt.sign(userData, process.env.SECRET_KEY);
  return token;
}

function unloadJWToken(token) {
  var userData = jwt.verify(token, process.env.SECRET_KEY);
  return userData;
}
module.exports = { generateJWToken, unloadJWToken };
