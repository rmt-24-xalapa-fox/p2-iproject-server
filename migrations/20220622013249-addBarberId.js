'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Transactions', 'BarberId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Barbers',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }, {})

    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Transactions', 'BarberId', {})
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
