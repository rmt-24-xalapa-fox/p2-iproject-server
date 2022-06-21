'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Players', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      year: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      overall: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      imgUrl1: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      imgUrl2: {
        type: Sequelize.STRING,

      },
      imgUrl3: {
        type: Sequelize.STRING,

      },
      price: {
        type: Sequelize.INTEGER,
      },
      TeamId: {
        type: Sequelize.INTEGER,
        references: {
          model: `Teams`,
          key: `id`
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      PositionId: {
        type: Sequelize.INTEGER,
        references: {
          model: `Positions`,
          key: `id`
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      CategoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: `Categories`,
          key: `id`
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('Players');
  }
};