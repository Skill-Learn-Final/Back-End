const express = require("express");
const passport = require("passport");
const AuthStrategy = require("passport-local");
const crypto = require("crypto");
const db = require("../database/models");
const { DataTypes } = require("sequelize");
const User = require("../database/models/user")(db.sequelize, DataTypes);

const router = express.Router();

// Configure AuthStrategy

passport.use(
  new AuthStrategy(async function (username, password, cb) {
    const possibleUser = await User.findOne({ where: { username: username } });
    if (possibleUser) {
      crypto.pbkdf2(
        password,
        possibleUser.passwordSalt,
        310000,
        32,
        "sha256",
        function (err, hashedPassword) {
          if (err) {
            return cb(null, false, {
              message: "Something went wrong",
            });
          }
          if (
            !crypto.timingSafeEqual(possibleUser.passwordHash, hashedPassword)
          ) {
            return cb(null, false, {
              message: "Incorrect username or password.",
            });
          }
          return cb(null, possibleUser);
        }
      );
    } else {
      return cb(null, false, {
        message: "No account found",
      });
    }
  })
);

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

// // Handle Local Login

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  function (req, res) {
    res.json("logged in");
  }
);

// Handle Local Register
router.post("/register", (req, res, next) => {
  var salt = crypto.randomBytes(16);
  crypto.pbkdf2(
    req.body.password,
    salt,
    310000,
    32,
    "sha256",
    async function (err, hashedPassword) {
      if (err) {
        return next(err);
      }
      try {
        const createdUser = await User.create({
          username: req.body.username,
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          passwordHash: hashedPassword,
          passwordSalt: salt,
          roles: ["learner"],
        });
        await createdUser.save();

        res.json(createdUser);
      } catch (err) {
        res.json(err.errors[0].message);
      }
    }
  );
});
module.exports = router;
