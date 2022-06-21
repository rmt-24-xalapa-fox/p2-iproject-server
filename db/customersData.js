const { hash } = require("../helpers/bcrypt");

let customersData = [
  {
    username: "aswad",
    email: "aswad@email.com",
    password: hash("aswad123", 9),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    username: "billy",
    email: "billy@email.com",
    password: hash("billy123", 9),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = customersData;
