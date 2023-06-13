const express = require("express");
const passport = require("passport");
const AuthStrategy = require("passport-local");
const crypto = require("crypto");
const db = require("../database/models");
const { DataTypes } = require("sequelize");
const User = require("../database/models/user")(db.sequelize, DataTypes);
const UserRole = require("../database/models/userrole")(
  db.sequelize,
  DataTypes
);
require("dotenv").config();
const jwt = require("jsonwebtoken");
const {
  sendPasswordResetEmail,
  sendEmailConfirmEmail,
} = require("../middleware/sendEmail");
const { authenticate } = require("../middleware/authenticate");

const router = express.Router();


// // Configure Passport to persist user information

// passport.serializeUser(function (user, cb) {
//   process.nextTick(function () {
//     cb(null, { id: user.id, username: user.username });
//   });
// });

// passport.deserializeUser(function (user, cb) {
//   process.nextTick(function () {
//     return cb(null, user);
//   });
// });

// ============= This is for purchasing currency, will move to serparate file later on =======================

router.post(
  "/buy_currency",
  authenticate("learner"),
  async (req, res, next) => {
    const possibleUser = req.user;
    crypto.pbkdf2(
      req.body.password,
      possibleUser.passwordSalt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        if (err) {
          return err.message;
        }
        if (
          !crypto.timingSafeEqual(possibleUser.passwordHash, hashedPassword)
        ) {
          res.status(401).json("Incorrect Password");
        } else {
          const newBalance = possibleUser.balance + req.body.balance;
          await possibleUser.update({ balance: newBalance });
          res
            .status(200)
            .send({
              message: "Balance Successfully Purchased",
              balance: newBalance,
            });
        }
      }
    );
  }
);

module.exports = router;
