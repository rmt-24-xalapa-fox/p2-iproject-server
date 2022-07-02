const { hash } = require("../helpers/bcrypt");

let customersData = [
  {
    username: "fauzan1",
    email: "fauzan1@email.com",
    password: hash("12345", 9),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    username: "fauzan2",
    email: "fauzan2@email.com",
    password: hash("12345", 9),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = customersData;
