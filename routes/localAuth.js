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

const router = express.Router();

// Configure AuthStrategy

passport.use(
  new AuthStrategy(async function (email, password, cb) {
    const possibleUser = await User.findOne({ where: { email: email } });
    if (possibleUser) {
      const role = await UserRole.findOne({
        where: { userId: possibleUser.id },
      });
      if (role) {
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
            possibleUser.setDataValue("role", role.role);
            // console.log(possibleUser);
            return cb(null, possibleUser);
          }
        );
      } else {
        return cb(null, false, { status: 404 });
      }
    } else {
      return cb(null, false, {
        status: 404,
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

router.post("/login", async (req, res, next) => {
  const possibleUser = await User.findOne({ where: { email: req.body.email } });
  if (possibleUser) {
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
          res.status(401).json("Incorrect Email or Password");
        }
        if (possibleUser.emailConfirmed === false) {
          res
            .status(401)
            .send("You need to confirm your email before continuing ");
        }
        try {
          const role = await UserRole.findAll({
            where: { userId: possibleUser.id },
          });
          if (role.length === 1) {
            possibleUser.setDataValue("role", role[0].role);
            res.send(possibleUser);
          } else {
            res.send("More than one role! You need to choose");
          }

          // res.send(role[0].role);
        } catch (err) {
          console.log(err.message);
          // res.send(err.message);
        }
      }
    );
  } else {
    res.status(404).json("We couldn't find an account with the provided Email");
  }
});

// router.post(
//   "/login",
//   passport.authenticate("local", { session: false }),
//   function (req, res) {
//     // console.log(req.user);
//     res.send(req.user);
//   }
// );

// Handle Local Register
router.post("/register", async (req, res, next) => {
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
          // username: req.body.username,
          email: req.body.email,
          firstName: req.body.fullName.split(" ")[0],
          lastName: req.body.fullName.split(" ")[1],
          passwordHash: hashedPassword,
          passwordSalt: salt,
        });
        await createdUser.save();

        const userRole = await UserRole.create({
          userId: createdUser.id,
          role: req.body.role,
        });
        await userRole.save();

        const secret = process.env.JWT_SECRET + createdUser.passwordHash;
        const payload = {
          email: createdUser.email,
          id: createdUser.id,
        };
        const token = jwt.sign(payload, secret, { expiresIn: "1d" });
        const link = `http://localhost:5000/api/local/confirm/${createdUser.id}/${token}`;
        sendEmailConfirmEmail(createdUser.email, createdUser.firstName, link)
          .then((response) => res.send(response.message))
          .catch((error) => res.send(error.message));
      } catch (err) {
        res.json(err);
      }
    }
  );
});

router.post("/reset_password/send_email", async (req, res, next) => {
  const possibleUser = await User.findOne({ where: { email: req.body.email } });
  if (possibleUser) {
    const secret = process.env.JWT_SECRET + possibleUser.passwordHash;
    const payload = {
      email: possibleUser.email,
      id: possibleUser.id,
    };
    const token = jwt.sign(payload, secret, { expiresIn: "2m" });
    const link = `http://localhost:3000/reset_password/${possibleUser.id}/${token}`;
    sendPasswordResetEmail("eliayele74@gmail.com", possibleUser.firstName, link)
      .then((response) => res.send(response.message))
      .catch((error) => console.log(error.message));
    res.status(200).send("Email Sent");
  } else res.status(404).send("Account with this email not found");
});

router.post("/reset_password/changePassword", async (req, res, next) => {
  const possibleUser = await User.findOne({ where: { id: req.body.id } });
  if (possibleUser) {
    const secret = process.env.JWT_SECRET + possibleUser.passwordHash;
    try {
      jwt.verify(req.body.token, secret);
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
            possibleUser.passwordHash = hashedPassword;
            possibleUser.passwordSalt = salt;
            await possibleUser.save();

            res.json(possibleUser);
          } catch (err) {
            res.json(err);
          }
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  }
});

router.get("/confirm/:id/:token", async (req, res, next) => {
  const confirmUser = await User.findOne({ where: { id: req.params.id } });
  if (confirmUser.emailConfirmed === true) {
    res.redirect("http://localhost:3000/live_classes");
  } else {
    const secret = process.env.JWT_SECRET + confirmUser.passwordHash;
    try {
      jwt.verify(req.params.token, secret);
      await confirmUser.update({ emailConfirmed: true });
    } catch (err) {
      console.log(err.message);
    }
    res.redirect("http://localhost:3000/login");
  }
});

module.exports = router;
