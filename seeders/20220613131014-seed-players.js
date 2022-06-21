'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
   const players = require('../data/player.json')
   players.forEach(el => {
    el.createdAt = el.updatedAt = new Date()
   });
   await queryInterface.bulkInsert('Players', players, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Players', null, {})
  }
};
