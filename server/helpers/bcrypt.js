const bcrypt = require("bcryptjs");

const bcryptPass = (password) => {
  const hash = bcrypt.hashSync(password, 10);
  return hash;
};

const bcryptCheckPass = (userInput, password) => {
  const valid = bcrypt.compareSync(userInput, password);
  return valid;
};

module.exports = { bcryptPass, bcryptCheckPass };
