'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const rentalans = require('../data/rentalan.json')
   rentalans.forEach(el => {
    el.createdAt = el.updatedAt = new Date()
   });
   await queryInterface.bulkInsert('Rentalans', rentalans, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Rentalans', null, {})
  }
};
