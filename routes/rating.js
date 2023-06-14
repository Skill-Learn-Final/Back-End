const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  createRating,
  getRatings,
  updateRating,
} = require("../controllers/rating");

router.get("/", getRatings);
router.post("/", createRating);
router.put("/:ratingId", updateRating);

module.exports = router;
