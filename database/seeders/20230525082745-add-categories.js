"use strict";

const { v4: uuid4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert("CourseCategories", [
      {
        id: "0c0e3fc5-f9b8-43c8-9afb-a8acca45194b",
        category: "Art and Design",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "36adfe2b-966e-4f71-a299-cf00caad7f1e",
        category: "Crafts and DIY",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "c34ba536-a507-4d79-b5e9-ee26b22e9b5c",
        category: "Cooking and Baking",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2dc9ec5c-d863-45f2-8543-816edc544bc4",
        category: "Music and Instruments",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "e8fb504f-327d-4b6d-a760-87aeb65359a4",
        category: "Sports and Fitness",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "3c093ee4-1c88-4196-824f-3823106a96f3",
        category: "Language and Communication",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "ca710c85-18a9-4a0f-84f8-7fa033dafcc3",
        category: "Technology and Coding",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "40c49b65-32c3-4714-9130-9cf7861eaa31",
        category: "Business and Entrepreneurship",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "b73d0a6f-60d5-4707-80ff-e5ed2e041a64",
        category: "Academic and Education",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "db6c1e94-7202-44ce-8539-f5848a1783f7",
        category: "Health and Wellness",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "20e533d2-b975-45ec-84fd-ffb11cf13568",
        category: "Gardening and Landscaping",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "7181b1e8-3a28-49ed-97bb-107298ba8057",
        category: "Photography and Videography",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "0f8faf7b-caf1-4e42-8898-90fb0cde2a4d",
        category: "Writing and Publishing",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "d5c0e084-fe80-4e5a-b2d0-389cd2cd55ee",
        category: "Performing Arts",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "28296c91-a5b8-44a4-99b1-d77991d5c857",
        category: "Home Improvement",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("CourseCategories", null, {});
  },
};
