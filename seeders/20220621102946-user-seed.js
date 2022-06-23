"use strict";

const { hashPassword } = require("../helpers");

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const users = require("../data/user.json");

    users.forEach((user) => {
      user.password = hashPassword(user.password);
      user.createdAt = new Date();
      user.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Users", users);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users');
  },
};
