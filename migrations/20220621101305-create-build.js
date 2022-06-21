'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Builds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER
      },
      HeroId: {
        type: Sequelize.INTEGER
      },
      Item1Id: {
        type: Sequelize.INTEGER
      },
      Item2Id: {
        type: Sequelize.INTEGER
      },
      Item3Id: {
        type: Sequelize.INTEGER
      },
      Item4Id: {
        type: Sequelize.INTEGER
      },
      Item5Id: {
        type: Sequelize.INTEGER
      },
      Item6Id: {
        type: Sequelize.INTEGER
      },
      Item7Id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Builds');
  }
};