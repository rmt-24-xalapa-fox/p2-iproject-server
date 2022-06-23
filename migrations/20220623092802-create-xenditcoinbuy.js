'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('xenditcoinbuys', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CoinbuyId: {
        type: Sequelize.INTEGER
      },
      xenditLink: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('xenditcoinbuys');
  }
};