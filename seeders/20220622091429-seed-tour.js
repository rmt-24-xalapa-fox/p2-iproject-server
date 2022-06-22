"use strict";
let data = require("../data/data.json");
module.exports = {
  async up(queryInterface, Sequelize) {
    data.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
      el.facility =
        "Untuk 1 orang, tiket pesawat, penginapan 2 malam, tour guide, makan siang, makan malam, transportasi, travel, snorkeling";
    });
    await queryInterface.bulkInsert("Tours", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Tours", null, { restartIdentity: true });
  },
};
