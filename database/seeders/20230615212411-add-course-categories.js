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

    await queryInterface.bulkInsert("CourseToCourseCategories", [
      {
        courseId: "729a1017-f38a-4cf8-abc1-e5642099c500",
        categoryId: "ca710c85-18a9-4a0f-84f8-7fa033dafcc3",
      },
      {
        courseId: "293a212f-4bac-4c05-9895-c94d3e2e88a3",
        categoryId: "ca710c85-18a9-4a0f-84f8-7fa033dafcc3",
      },
      {
        courseId: "85ebf490-8010-4e6a-b681-c703b1af0c51",
        categoryId: "ca710c85-18a9-4a0f-84f8-7fa033dafcc3",
      },
      {
        courseId: "d499dfca-032e-4a63-b6c2-341a14cbf4e5",
        categoryId: "ca710c85-18a9-4a0f-84f8-7fa033dafcc3",
      },
      {
        courseId: "a505cf78-593e-4511-83ec-e09dc01c682e",
        categoryId: "40c49b65-32c3-4714-9130-9cf7861eaa31",
      },
      {
        courseId: "68f5a86f-65ea-4816-a70e-aa39cd9e948f",
        categoryId: "7181b1e8-3a28-49ed-97bb-107298ba8057",
      },
      {
        courseId: "a54e3a7f-9132-48a2-acab-9030001f427c",
        categoryId: "40c49b65-32c3-4714-9130-9cf7861eaa31",
      },
      {
        courseId: "abab54c7-8f2b-4748-934e-4f487fd60a66",
        categoryId: "0f8faf7b-caf1-4e42-8898-90fb0cde2a4d",
      },
      {
        courseId: "9cbef3a6-e225-4fcc-82e5-e22896c80e14",
        categoryId: "c34ba536-a507-4d79-b5e9-ee26b22e9b5c",
      },
      {
        courseId: "8002c2f6-438f-4044-96f9-abcf2bdf0258",
        categoryId: "0c0e3fc5-f9b8-43c8-9afb-a8acca45194b",
      },
      {
        courseId: "2442c5b4-5227-4287-a515-25a571a7b692",
        categoryId: "db6c1e94-7202-44ce-8539-f5848a1783f7",
      },
      {
        courseId: "e22e27ad-ecc2-426b-b76b-4d8adf36f0f8",
        categoryId: "40c49b65-32c3-4714-9130-9cf7861eaa31",
      },
      {
        courseId: "2c29e065-86ba-4232-bc8b-a43cb3388bb2",
        categoryId: "ca710c85-18a9-4a0f-84f8-7fa033dafcc3",
      },
      {
        courseId: "f89e84c4-a7c7-4e81-a9b6-3727da9ed54d",
        categoryId: "7181b1e8-3a28-49ed-97bb-107298ba8057",
      },
      {
        courseId: "4949c4ad-84c6-4862-becd-98c1d3705eeb",
        categoryId: "0f8faf7b-caf1-4e42-8898-90fb0cde2a4d",
      },
      {
        courseId: "282666bd-6d00-45c8-a2d5-7bca0544f05d",
        categoryId: "ca710c85-18a9-4a0f-84f8-7fa033dafcc3",
      },
      {
        courseId: "46f5e899-f36d-4381-bf7e-25d7fadb84ef",
        categoryId: "2dc9ec5c-d863-45f2-8543-816edc544bc4",
      },
      {
        courseId: "4298a2e3-064f-4d7e-80c3-4682e17698db",
        categoryId: "ca710c85-18a9-4a0f-84f8-7fa033dafcc3",
      },
      {
        courseId: "23d9aaba-338b-43eb-a0e9-b3e395b372a1",
        categoryId: "3c093ee4-1c88-4196-824f-3823106a96f3",
      },
      {
        courseId: "2b8d28a3-e4e2-45be-9910-dca62d6cb0aa",
        categoryId: "7181b1e8-3a28-49ed-97bb-107298ba8057",
      },
      {
        courseId: "c2c77953-8793-448c-a235-82ae0abfb66f",
        categoryId: "0f8faf7b-caf1-4e42-8898-90fb0cde2a4d",
      },
      {
        courseId: "61081774-4cb2-48eb-bbe1-f53f59e2f719",
        categoryId: "0c0e3fc5-f9b8-43c8-9afb-a8acca45194b",
      },
      {
        courseId: "0bd7cec0-3192-4686-a2f5-c4580965d25e",
        categoryId: "40c49b65-32c3-4714-9130-9cf7861eaa31",
      },
      {
        courseId: "aac44749-d4c1-4488-9962-b6dc8e2623ec",
        categoryId: "ca710c85-18a9-4a0f-84f8-7fa033dafcc3",
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

    await queryInterface.bulkDelete("CourseToCourseCategories", null, {});
  },
};
