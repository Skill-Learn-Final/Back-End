const express = require("express");
const router = express.Router();
const { authUser } = require("../middleware/authenticate");

router.get("/", authUser, (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200);
    res.send("OK");
  });
});

module.exports = router;
