const express = require("express");
const router = express.Router();
// const { authUser } = require("../middleware/authenticate");

router.get("/", (req, res, next) => {
  res.clearCookie("access_token", { httpOnly: true });
  res.end();
});

module.exports = router;
