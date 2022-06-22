'use strict';

const { createpassword } = require("../helpers/helper");

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Users', [{
    email: 'staff@mail.com',
    password: createpassword('tes123'),
    CompanyId: 1,
    role: 'staff',
    createdAt: new Date(),
    updatedAt: new Date()
   },{
    email: 'admin@mail.com',
    password: createpassword('tes123'),
    CompanyId: 1,
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
   }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null)
  }
};
