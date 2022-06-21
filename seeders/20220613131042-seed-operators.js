'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const operators = require('../data/operator.json')
   operators.forEach(el => {
    el.createdAt = el.updatedAt = new Date()
   });
   await queryInterface.bulkInsert('Operators', operators, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Operators', null, {})
  }
};
