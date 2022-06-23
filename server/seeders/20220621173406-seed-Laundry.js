"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../data/laundry.json");

    data.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Laundries", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Laundries", null, {});
  },
};
