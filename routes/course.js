const express = require("express");
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
  publishCourse,
  getCourseListUnderReview,
  assignReviewer,
  streamVideo,
  getCourseListsByReviewer,
  approveCourse,
  rejectCourse,
} = require("../controllers/course");
const upload = require("../middleware/upload");

const router = express.Router();

router.post("/", upload.single("coursePoster"), createCourse);
router.get("/", getCourseList);
router.get("/under-review", getCourseListUnderReview);
router.get("/byReviewer", getCourseListsByReviewer);
router.get("/stream/:lessonId", streamVideo);
router.get("/:courseId", getCourse);
router.delete("/:courseId", deleteCourse);
router.put("/:courseId", upload.single("coursePoster"), updateCourse);
router.put("/:courseId/assign-reviewer", assignReviewer);
router.put("/:courseId/publish", publishCourse);
router.put("/:courseId/approve", approveCourse);
router.put("/:courseId/reject", rejectCourse);

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
