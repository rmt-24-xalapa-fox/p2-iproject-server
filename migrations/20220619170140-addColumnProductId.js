"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "Sales",
      "ProductId",
      {
        type: Sequelize.INTEGER,
        references: {
          model: "Products",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Sales", "ProductId", {});
  }
};
