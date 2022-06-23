'use strict';
const { hasPassword } = require('../helpers/bcrypt');
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = require('../data/user-dummy.json')
    users.forEach(user => {
      user.password = hasPassword(user.password)
      user.createdAt = new Date()
      user.updatedAt = new Date()
    })

    await queryInterface.bulkInsert('Users', users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {
      restartIdentity: true
    });
  }
};
