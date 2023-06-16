const { StatusCodes } = require("http-status-codes");
const db = require("../database/models");
const { Op } = require("sequelize");

const getRelatedCourses = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    const course = await db.Course.findOne({
      where: {
        id: courseId,
      },
    });

    if (!course) throw new Error("Course not found!");

    const result = await fetch(
      `http://127.0.0.1:5000/courses/related?title=${course.title}`
    );
    const relatedCoursesIds = await result.json();

    const relatedCourses = await db.Course.findAll({
      where: {
        id: {
          [Op.in]: relatedCoursesIds,
        },
      },
      include: ["categories"],
    });

    return res.status(StatusCodes.OK).json(relatedCourses);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json(error.message);
  }
};

module.exports = { getRelatedCourses };
