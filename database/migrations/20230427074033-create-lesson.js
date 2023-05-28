"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Lessons", {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        type: Sequelize.UUID,
      },
      title: {
        type: Sequelize.STRING,
      },
      chapterId: {
        type: Sequelize.UUID,
        references: {
          model: "Chapters",
          key: "id",
        },
      },
      videoLink: {
        type: Sequelize.STRING,
      },
      thumbnailLink: {
        type: Sequelize.STRING,
      },
      duration: {
        type: Sequelize.DOUBLE,
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
    await queryInterface.dropTable("Lessons");
  },
};
