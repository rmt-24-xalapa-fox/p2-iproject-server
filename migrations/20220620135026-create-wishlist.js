'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Wishlists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      productName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      productBrand: {
        type: Sequelize.STRING
      },
      productPrice: {
        type: Sequelize.STRING
      },
      productImage: {
        type: Sequelize.STRING
      },
      productDescription: {
        type: Sequelize.STRING
      },
      productCategory: {
        type: Sequelize.STRING
      },
      productType: {
        type: Sequelize.STRING
      },
      productTags: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      productColors: {
        type: Sequelize.ARRAY(Sequelize.STRING)
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
    await queryInterface.dropTable('Wishlists');
  }
};