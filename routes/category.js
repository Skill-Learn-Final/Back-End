const express = require("express");
const { getCategoryList } = require("../controllers/category");
const router = express.Router();

router.get("/", getCategoryList);

module.exports = router;
