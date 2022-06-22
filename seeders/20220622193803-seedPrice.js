"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    let prices = require("../data/prices.json");
    prices.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Prices", prices, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Prices", null, {});
  },
};