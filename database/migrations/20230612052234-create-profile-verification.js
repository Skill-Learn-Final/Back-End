'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProfileVerifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.UUID
      },
      creatorId: {
        type: Sequelize.UUID
      },
      professionalTitle: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      governmentIdLink: {
        type: Sequelize.STRING
      },
      proofDocumentLink: {
        type: Sequelize.STRING
      },
      isReviewed: {
        type: Sequelize.BOOLEAN
      },
      isApproved: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('ProfileVerifications');
  }
};