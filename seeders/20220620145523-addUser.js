"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../data/user.json");
    const users = data.map((user) => {
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
