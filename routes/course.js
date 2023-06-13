const express = require("express");
const multer = require("multer");
const {
  createCourse,
  getCourseList,
  getCourse,
  deleteCourse,
  updateCourse,
  getChapterList,
  createChapter,
  getChapter,
  deleteChapter,
  updateChapter,
  createLesson,
  getLessonList,
  getLesson,
  deleteLesson,
  updateLesson,
} = require("../controllers/course");

const router = express.Router();
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + "." + file.mimetype.split("/")[1]
    );
  },
});
const fileFilter = (req, file, cb) => {
  if (file.fieldname === "coursePoster" || file.fieldname === "thumbnail") {
    if (
      file.mimetype.split("/")[1] === "jpeg" ||
      file.mimetype.split("/")[1] === "png" ||
      file.mimetype.split("/")[1] === "jpg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
    }
  } else if (file.fieldname === "video") {
    if (file.mimetype.split("/")[1] === "mp4") {
      cb(null, true);
    } else {
      cb(new Error("Video uploaded is not of type mp4"), false);
    }
  }

  cb(null, true);
};

const upload = multer({ storage, fileFilter });

router.put("/:courseId", upload.single("coursePoster"), updateCourse);
router.post("/", upload.single("coursePoster"), createCourse);
router.get("/", getCourseList);
router.get("/:courseId", getCourse);
router.delete("/:courseId", deleteCourse);

router.post("/:courseId/chapters", createChapter);
router.get("/:courseId/chapters", getChapterList);
router.get("/:courseId/chapters/:chapterId", getChapter);
router.delete("/:courseId/chapters/:chapterId", deleteChapter);
router.put("/:courseId/chapters/:chapterId", updateChapter);

router.post(
  "/:courseId/chapters/:chapterId/lessons",
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  createLesson
);
router.get("/:courseId/chapters/:chapterId/lessons", getLessonList);
router.get("/:courseId/chapters/:chapterId/lessons/:lessonId", getLesson);
router.delete("/:courseId/chapters/:chapterId/lessons/:lessonId", deleteLesson);
router.put(
  "/:courseId/chapters/:chapterId/lessons/:lessonId",
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  updateLesson
);

module.exports = router;
