const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  createComment,
  getComments,
  createReply,
} = require("../controllers/comment");

const { authenticate } = require("../middleware/authenticate");
const { Roles } = require("../utils/constants");
const {
  reportComment,
  unreportComment,
  deleteComment,
} = require("../controllers/comment");

router.get("/", getComments);
router.post("/", createComment);
router.put("/:commentId/report", reportComment);
router.put("/:commentId/unreport", unreportComment);
router.delete("/:commentId", deleteComment);
router.post("/:commentId/replies", createReply);

module.exports = router;
