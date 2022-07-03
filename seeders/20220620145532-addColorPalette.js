"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../data/colorPalette.json");
    const colorPalettes = data.map((colorPalette) => {
      colorPalette.createdAt = colorPalette.updatedAt = new Date();
      return colorPalette;
    });
    await queryInterface.bulkInsert("ColorPalettes", colorPalettes, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ColorPalettes", null, {});
  },
};
