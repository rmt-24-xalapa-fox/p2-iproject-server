'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const animes = require("../anime.json");
    animes.forEach(anime=>{
       anime.createdAt = new Date();
       anime.updatedAt = new Date()
    });
    await queryInterface.bulkInsert("Animes", animes, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Animes', null, {});
  }
};
