'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const products = require("../data/products.json");

    products.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Products", products, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  }
};
