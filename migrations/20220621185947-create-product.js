'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      url: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      asin: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.STRING,
      },
      brand: {
        type: Sequelize.STRING,
      },
      product_details: {
        type: Sequelize.TEXT,
      },
      breadcrumbs: {
        type: Sequelize.STRING,
      },
      images_list: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
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
    await queryInterface.dropTable('Products');
  }
};