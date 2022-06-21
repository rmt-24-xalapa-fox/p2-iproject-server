"use strict";

const { encryptPassword } = require("../helpers/bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../data/user.json");
    const users = data.map((user) => {
      user.profilePicture = `https://avatars.dicebear.com/api/identicon/${user.name}.png`;
      user.password = encryptPassword(user.password);
      user.createdAt = user.updatedAt = new Date();
      user.plan = "Free";
      return user;
    });
    await queryInterface.bulkInsert("Users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
