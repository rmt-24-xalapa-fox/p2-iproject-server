'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Novels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      synopsis: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      imageUrl: {
        allowNull: false,
        type: Sequelize.STRING
      },
      releaseDate: {
        allowNull: false,
        type: Sequelize.STRING
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      staffId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: "Staffs",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      genreId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: "Genres",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade"
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
    await queryInterface.dropTable('Novels');
  }
};