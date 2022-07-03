"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Quota", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      MountainId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Mountains",
          key: "id",
        },
      },
      date: {
        type: Sequelize.DATE,
      },
      quotaUse: {
        type: Sequelize.INTEGER,
      },
      quotaMax: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Quota");
  },
};
