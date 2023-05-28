const db = require("../database/models");
const { DataTypes } = require("sequelize");
const CourseCategory = require("../database/models/coursecategory")(
  db.sequelize,
  DataTypes
);

// const createCategory = async (req, res) => {

//     const {}

// }

const getCategoryList = async (req, res, next) => {
  try {
    const categories = await CourseCategory.findAll();
    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategoryList,
};
