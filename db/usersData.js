const { hash } = require("../helpers/bcrypt");

let usersData = [
  {
    username: "fauzan",
    email: "fauzan@email.com",
    password: hash("fauzan123", 9),
    role: "admin",
    phoneNumber: "085221466466",
    address: "Majalengka",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    username: "pojan",
    email: "pojan@email.com",
    password: hash("pojan123", 9),
    role: "admin",
    phoneNumber: "085221466467",
    address: "Bandung",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = usersData;
