'use strict';

const { hashSync } = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const operators = require('../data/operator.json')
    operators.forEach(el => {
      el.password = hashSync(el.password)
      el.createdAt = el.updatedAt = new Date()
    });
    await queryInterface.bulkInsert('Operators', operators, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Operators', null, {})
  }
};
