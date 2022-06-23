const bcrypt = require("bcryptjs/dist/bcrypt");

function encryptPw(password) {
    const salt = bcrypt.genSaltSync(8);
    password = bcrypt.hashSync(password, salt);

    return password
  }
  
  module.exports = encryptPw