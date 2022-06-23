"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Pets", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
            },
            gender: {
                type: Sequelize.STRING,
            },
            age: {
                type: Sequelize.INTEGER,
            },
            size: {
                type: Sequelize.STRING,
            },
            primaryBreed: {
                type: Sequelize.STRING,
            },
            secondaryBreed: {
                type: Sequelize.STRING,
            },
            mixedBreed: {
                type: Sequelize.BOOLEAN,
            },
            unknownBreed: {
                type: Sequelize.BOOLEAN,
            },
            spayed: {
                type: Sequelize.BOOLEAN,
            },
            houseTrained: {
                type: Sequelize.BOOLEAN,
            },
            declawed: {
                type: Sequelize.BOOLEAN,
            },
            specialNeeds: {
                type: Sequelize.BOOLEAN,
            },
            shots: {
                type: Sequelize.BOOLEAN,
            },
            goodWithChildren: {
                type: Sequelize.BOOLEAN,
            },
            goodWithDogs: {
                type: Sequelize.BOOLEAN,
            },
            goodWithCats: {
                type: Sequelize.BOOLEAN,
            },
            imageUrl: {
                type: Sequelize.STRING,
            },
            description: {
                type: Sequelize.TEXT,
            },
            OwnerId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Users",
                    key: "id",
                },
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
        await queryInterface.dropTable("Pets");
    },
};
