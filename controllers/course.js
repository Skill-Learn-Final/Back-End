const { StatusCodes } = require("http-status-codes");
const db = require("../database/models");
const { DataTypes, UniqueConstraintError, Op } = require("sequelize");
const path = require("path");
const fs = require("fs");

// Course
const createCourse = async (req, res, next) => {
  try {
    let {
      title,
      description,
      price,
      courseCategories,
      difficulty,
      estimatedCompletionTime,
      language,
    } = req.body;
    let { id: userId } = req.user;

    const course = await db.Course.create({
      title,
      description,
      price,
      difficulty,
      coursePosterLink: `${req.protocol}://${req.hostname}:8080/uploads/${req.file.filename}`,
      creatorUserId: userId,
      estimatedCompletionTime,
      language,
    });

    if (courseCategories) {
      const courseCategoriesArray = JSON.parse(courseCategories);

      console.log({ courseCategoriesArray });

      const courseCategoriesMapped = await db.CourseCategory.findAll({
        where: {
          category: {
            [Op.in]: courseCategoriesArray,
          },
        },
      });

      await course.setCategories(courseCategoriesMapped);
    }

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
    const {
      title,
      description,
      price,
      courseCategories,
      difficulty,
      estimatedCompletionTime,
      language,
    } = req.body;
    const courseUpdate = {
      title,
      description,
      price,
      difficulty,
      estimatedCompletionTime,
      language,
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

    if (courseCategories) {
      const courseCategoriesArray = JSON.parse(courseCategories);

      console.log({ courseCategoriesArray });

      const courseCategoriesMapped = await db.CourseCategory.findAll({
        where: {
          category: {
            [Op.in]: courseCategoriesArray,
          },
        },
      });

      await course[1].setCategories(courseCategoriesMapped);
    }

    res.status(200).json({
      success: true,
      data: course[1].dataValues,
    });
  } catch (error) {
    next(error);
  }
};

const assignReviewer = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const { reviewerId } = req.body;

    const course = await db.Course.update(
      {
        reviewerId,
      },
      {
        where: { id: courseId },
        returning: true,
        plain: true,
      }
    );
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
    console.log(error);
    next(error);
  }
};

const approveCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const course = await db.Course.update(
      {
        isApproved: true,
        isReviewed: true,
        rejectionReasons: [],
      },
      {
        where: { id: courseId },
        returning: true,
        plain: true,
      }
    );
    res.status(200).json({
      success: true,
      data: course[1].dataValues,
    });
  } catch (error) {
    next(error);
  }
};

const rejectCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const { rejectionReasons } = req.body;
    const course = await db.Course.update(
      {
        isApproved: false,
        isReviewed: true,
        rejectionReasons,
      },
      {
        where: { id: courseId },
        returning: true,
        plain: true,
      }
    );
    res.status(200).json({
      success: true,
      data: course[1].dataValues,
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
      order: [[{ model: db.Chapter, as: "chapters" }, "createdAt", "ASC"]],
      include: [
        {
          model: db.Chapter,
          as: "chapters",
          include: [
            {
              model: db.Lesson,
              as: "lessons",
            },
          ],
        },
        "categories",
        "creator",
      ],
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
    const { status } = req.query;

    const filter =
      status === "published"
        ? { isPublished: true }
        : status === "review-requested"
        ? { isPublished: true, isReviewed: false }
        : status === "rejected"
        ? { isReviewed: true, isApproved: false }
        : status === "draft"
        ? { isPublished: false }
        : {};

    const courses = await db.Course.findAll({
      include: ["chapters", "categories"],
      where: filter,
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

const getCourseListUnderReview = async (req, res, next) => {
  try {
    const courses = await db.Course.findAll({
      include: ["reviewer", "creator", "categories"],
      where: { isReviewed: false, isPublished: true },
    });
    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    next(error);
  }
};

const getCourseListsByReviewer = async (req, res, next) => {
  try {
    const courses = await db.Course.findAll({
      include: ["reviewer", "creator", "categories"],
      where: {
        reviewerId: {
          [Op.ne]: null,
        },
        isReviewed: false,
        isPublished: true,
      },
    });
    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    next(error);
  }
};

const publishCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const course = await db.Course.update(
      {
        isPublished: true,
      },
      {
        where: { id: courseId },
        returning: true,
        plain: true,
      }
    );
    res.status(200).json({
      success: true,
      data: course[1].dataValues,
    });
  } catch (error) {
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
      videoLink: `videos/${video[0].filename}`,
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

const streamVideo = async (req, res, next) => {
  try {
    const { lessonId } = req.params;
    const lesson = await db.Lesson.findOne({ where: { id: lessonId } });

    console.log({ lessonId });
    if (!lesson) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Lesson not found",
      });
    }

    const range = req.headers.range;
    if (!range) res.status(400).send("error");

    const videoPath = lesson.videoLink;

    const videoSize = fs.statSync(videoPath).size;

    console.log(videoSize);

    const chunkSize = 10 ** 6;
    // bytes=64165
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + chunkSize, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };

    res.writeHead(206, headers);

    const videoStream = fs.createReadStream(videoPath, { start, end });

    videoStream.pipe(res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// live courses list with filter

const getCoursesWithFilter = (req, res, next) => {
  try {
  } catch (err) {}
};

module.exports = {
  createCourse,
  updateCourse,
  assignReviewer,
  deleteCourse,
  getCourse,
  getCourseList,
  getCourseListUnderReview,
  getCourseListsByReviewer,
  publishCourse,
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
  streamVideo,
  approveCourse,
  rejectCourse,
};
