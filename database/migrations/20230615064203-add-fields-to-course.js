"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn("Courses", "language", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "English",
    });

    await queryInterface.addColumn("Courses", "estimatedCompletionTime", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "1 Day",
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
