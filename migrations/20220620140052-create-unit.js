'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Units', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      psType: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      RentalanId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Rentalans",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      PlayerId: {
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
    await queryInterface.dropTable('Units');
  }
};