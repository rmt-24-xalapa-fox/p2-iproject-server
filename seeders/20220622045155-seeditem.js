'use strict';

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
    const data = require("../data/items.json")
    const items = []

    data.Medicine.forEach(m => {
      m.type = "Medicine"
      m.createdAt = new Date()
      m.updatedAt = new Date()
      items.push(m)
    });

    data.Utils.forEach(m => {
      m.type = "Utils"
      m.createdAt = new Date()
      m.updatedAt = new Date()
      items.push(m)
    });

    data.Valuable.forEach(m => {
      m.type = "Valuable"
      m.createdAt = new Date()
      m.updatedAt = new Date()
      items.push(m)
    });

    data.Berry.forEach(m => {
      m.type = "Berry"
      m.createdAt = new Date()
      m.updatedAt = new Date()
      items.push(m)
    });

    await queryInterface.bulkInsert('Items', items, {})

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Items', null, { restartIdentity:true, truncate:true, cascade:true });
  }
};
