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
   const coin = require('../data/coin.json');
   coin.forEach(element => {
    element.createdAt = new Date();
    element.updatedAt = new Date();
    delete element.id;
  });
  return queryInterface.bulkInsert('CoinPrices', coin, {});
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('CoinPrices', null, {});
  }
};
