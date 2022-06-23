'use strict';
const fs = require('fs');
module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const wallet = require('../data/wallet.json');
   wallet.forEach(element => {
    element.createdAt = new Date();
    element.updatedAt = new Date();
    delete element.id;
  });
  return queryInterface.bulkInsert('Wallets', wallet, {});
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Wallets', null, {});
  }
};