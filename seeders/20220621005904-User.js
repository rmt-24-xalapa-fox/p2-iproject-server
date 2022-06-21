"use strict";

const { hashPass } = require("../helps/help");


module.exports = {
  async up(queryInterface, Sequelize) {
    const dataja = require("../userSeeder/users.json");
    dataja.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();

      el.password = hashPass(el.password);
    });

    await queryInterface.bulkInsert("Users", dataja, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
