const { StatusCodes } = require("http-status-codes");
const db = require("../database/models");
const { DataTypes, UniqueConstraintError } = require("sequelize");

// Course
const createCourse = async (req, res, next) => {
  try {
    let { title, description, price, courseCategories, difficulty } = req.body;

    if (courseCategories) {
      courseCategories = JSON.parse(courseCategories);
    } else {
      courseCategories = [];
    }

    const course = await db.Course.create({
      title,
      description,
      price,
      difficulty,
      coursePosterLink: `${req.protocol}://${req.hostname}:8080/uploads/${req.file.filename}`,
      creatorUserId: "14c3e128-10fb-43be-93a8-78ae3f569fe7",
    });

    courseCategories.forEach(async (c) => {
      const category = await db.CourseCategory.findOne({
        where: { id: c.id },
      });

      course.addCategories(category);
    });

    res.status(201).json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.log(error);

    if (error instanceof UniqueConstraintError) {
      res
        .status(StatusCodes.CONFLICT)
        .json({ success: false, message: "Course Already Exists!" });
    }

    next(error);
  }
};

const updateCourse = async (req, res, next) => {
  try {
    const { title, description, price } = req.body;
    const courseUpdate = {
      title,
      description,
      price,
    };
    if (req.file) {
      courseUpdate.coursePosterLink = `${req.protocol}://${req.hostname}:8080/uploads/${req.file.filename}`;
    }

    const { courseId } = req.params;
    const course = await db.Course.update(courseUpdate, {
      where: { id: courseId },
      returning: true,
      plain: true,
    });
    res.status(200).json({
      success: true,
      data: course[1].dataValues,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const course = await db.Course.destroy({
      where: { id: courseId },
    });
    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

const getCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const course = await db.Course.findOne({
      where: { id: courseId },
      include: ["chapters", "categories"],
    });
    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

const getCourseList = async (req, res, next) => {
  try {
    const courses = await db.Course.findAll({
      include: ["chapters", "categories"],
    });
    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Chapter
const createChapter = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const courseId = req.params.courseId;

    const chapter = await db.Chapter.create({
      title,
      description,
      courseId,
    });
    res.status(201).json({
      success: true,
      data: chapter,
    });
  } catch (error) {
    next(error);
  }
};

const updateChapter = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { chapterId, courseId } = req.params;

    const chapter = await db.Chapter.update(
      {
        title,
        description,
      },
      {
        where: { id: chapterId, courseId },
        returning: true,
        plain: true,
      }
    );
    res.status(200).json({
      success: true,
      data: chapter[1].dataValues,
    });
  } catch (error) {
    next(error);
  }
};

const deleteChapter = async (req, res, next) => {
  try {
    const { chapterId, courseId } = req.params;
    const chapter = await db.Chapter.destroy({
      where: { id: chapterId, courseId },
    });
    res.status(200).json({
      success: true,
      data: chapter,
    });
  } catch (error) {
    next(error);
  }
};

const getChapter = async (req, res, next) => {
  try {
    const { chapterId, courseId } = req.params;
    const chapter = await db.Chapter.findOne({
      where: { id: chapterId, courseId },
    });
    res.status(200).json({
      success: true,
      data: chapter,
    });
  } catch (error) {
    next(error);
  }
};

const getChapterList = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const chapters = await db.Chapter.findAll({
      where: { courseId },
    });
    res.status(200).json({
      success: true,
      data: chapters,
    });
  } catch (error) {
    next(error);
  }
};

// Lesson
const createLesson = async (req, res, next) => {
  try {
    const { title, duration } = req.body;
    const chapterId = req.params.chapterId;

    const { thumbnail, video } = req.files;

    const lesson = await db.Lesson.create({
      title,
      duration,
      chapterId,
      thumbnailLink: `${req.protocol}://${req.hostname}:8080/uploads/${thumbnail[0].filename}`,
      videoLink: `${req.protocol}://${req.hostname}:8080/uploads/${video[0].filename}`,
    });
    res.status(201).json({
      success: true,
      data: lesson,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateLesson = async (req, res, next) => {
  try {
    const { title, duration } = req.body;
    const { lessonId, chapterId } = req.params;

    const { thumbnail, video } = req.files;

    const lessonUpdate = {
      title,
      duration,
    };

    if (thumbnail) {
      lessonUpdate.thumbnailLink = `${req.protocol}://${req.hostname}:8080/uploads/${thumbnail[0].filename}`;
    }

    if (video) {
      lessonUpdate.videoLink = `${req.protocol}://${req.hostname}:8080/uploads/${video[0].filename}`;
    }

    const lesson = await db.Lesson.update(lessonUpdate, {
      where: { id: lessonId, chapterId },
      returning: true,
      plain: true,
    });
    res.status(200).json({
      success: true,
      data: lesson[1].dataValues,
    });
  } catch (error) {
    next(error);
  }
};

const deleteLesson = async (req, res, next) => {
  try {
    const { lessonId, chapterId } = req.params;
    const lesson = await db.Lesson.destroy({
      where: { id: lessonId, chapterId },
    });
    res.status(200).json({
      success: true,
      data: lesson,
    });
  } catch (error) {
    next(error);
  }
};

const getLesson = async (req, res, next) => {
  try {
    const { lessonId, chapterId } = req.params;
    const lesson = await db.Lesson.findOne({
      where: { id: lessonId, chapterId },
    });
    res.status(200).json({
      success: true,
      data: lesson,
    });
  } catch (error) {
    next(error);
  }
};

const getLessonList = async (req, res, next) => {
  try {
    const { chapterId } = req.params;
    const lessons = await db.Lesson.findAll({
      where: { chapterId },
    });
    res.status(200).json({
      success: true,
      data: lessons,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCourse,
  updateCourse,
  deleteCourse,
  getCourse,
  getCourseList,
  createChapter,
  updateChapter,
  deleteChapter,
  getChapter,
  getChapterList,
  createLesson,
  updateLesson,
  deleteLesson,
  getLesson,
  getLessonList,
};
