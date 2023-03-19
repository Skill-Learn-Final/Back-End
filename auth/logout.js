const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("home");
  });
});

module.exports = router;
