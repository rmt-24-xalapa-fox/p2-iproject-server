'use strict';
const {hashPass} = require('../helpers/bcrypt')
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
   const user = require('../data/user.json');
   user.forEach(element => {
    element.createdAt = new Date();
    element.updatedAt = new Date();
    element.password = hashPass(element.password);
    delete element.id;
  });
  return queryInterface.bulkInsert('Users', user, {});
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {});
  }
};