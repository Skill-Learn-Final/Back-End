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

    console.log("This is the UUID generated:", uuid4());

    await queryInterface.bulkInsert("CourseCategories", [
      {
        id: uuid4(),
        category: "Art and Design",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid4(),
        category: "Crafts and DIY",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid4(),
        category: "Cooking and Baking",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid4(),
        category: "Music and Instruments",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid4(),
        category: "Sports and Fitness",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid4(),
        category: "Language and Communication",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid4(),
        category: "Technology and Coding",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid4(),
        category: "Business and Entrepreneurship",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid4(),
        category: "Academic and Education",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid4(),
        category: "Health and Wellness",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid4(),
        category: "Gardening and Landscaping",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid4(),
        category: "Photography and Videography",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid4(),
        category: "Writing and Publishing",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid4(),
        category: "Performing Arts",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid4(),
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
    await queryInterface.bulkDelete("CourseCategory", null, {});
  },
};
