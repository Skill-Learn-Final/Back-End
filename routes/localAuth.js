const express = require("express");
const passport = require("passport");
const AuthStrategy = require("passport-local");
const crypto = require("crypto");
const db = require("../database/models");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const {
  sendPasswordResetEmail,
  sendEmailConfirmEmail,
} = require("../middleware/sendEmail");
const { authenticate } = require("../middleware/authenticate");
const { StatusCodes } = require("http-status-codes");
const { Roles } = require("../utils/constants");

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
  try {
    const possibleUser = await db.User.findOne({
      where: { email: req.body.email },
      include: ["roles"],
    });
    if (possibleUser) {
      const hashedPassword = await new Promise((resolve, reject) => {
        crypto.pbkdf2(
          req.body.password,
          possibleUser.passwordSalt,
          310000,
          32,
          "sha256",
          (err, hashedPassword) => {
            if (err) reject(err);
            resolve(hashedPassword);
          }
        );
      });
      if (!crypto.timingSafeEqual(possibleUser.passwordHash, hashedPassword)) {
        res
          .status(StatusCodes.UNAUTHORIZED)
          .json("Incorrect Email or Password");
      }
      if (possibleUser.emailConfirmed === false) {
        res.status(StatusCodes.UNAUTHORIZED).send({
          message: "You need to confirm your email before continuing ",
          id: possibleUser.id,
        });
      }
      const { id, balance, email, firstName, lastName, roles, profilePicture } =
        possibleUser;
      const payload = {
        id,
        balance,
        email,
        firstName,
        lastName,
        roles: roles.map((r) => r.role),
        profilePicture,
      };
      const secret = process.env.JWT_SECRET + possibleUser.passwordHash;

      const token = jwt.sign(payload, secret, { expiresIn: "1d" });
      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .cookie("userId", payload.id)
        .status(200)
        .send({ token });
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json("We couldn't find an account with the provided Email");
    }
  } catch (error) {}
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
  const { email, fullName, password, role } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Check if user already exists
    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Hash the password
    const salt = crypto.randomBytes(16);
    const hashedPassword = await new Promise((resolve, reject) => {
      crypto.pbkdf2(password, salt, 310000, 32, "sha256", (err, key) => {
        if (err) reject(err);
        resolve(key);
      });
    });

    // Create the user
    const createdUser = await db.User.create({
      email,
      firstName: fullName.split(" ")[0],
      lastName: fullName.split(" ")[1],
      passwordHash: hashedPassword,
      passwordSalt: salt,
    });

    // Add the user to the UserRoles table
    const userRole = await db.UserRole.create({
      userId: createdUser.id,
      role: role ?? Roles.LEARNER,
    });
    await createdUser.addRoles(userRole);

    // Generate a JWT token
    const payload = {
      email: createdUser.email,
      id: createdUser.id,
      role: role ?? Roles.LEARNER,
    };
    const secret = process.env.JWT_SECRET + createdUser.passwordHash;
    const token = jwt.sign(payload, secret, { expiresIn: "1d" });

    // Send confirmation email
    const link = `http://localhost:8080/api/local/confirm/${createdUser.id}/${token}`;
    sendEmailConfirmEmail(createdUser.email, createdUser.firstName, link)
      .then((response) => console.log(response.message))
      .catch((error) => console.log(error.message));

    // Return the newly created user
    res.status(200).json({
      email: createdUser.email,
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
      roles: [role ?? Roles.LEARNER],
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/reset_password/send_email", async (req, res, next) => {
  const possibleUser = await db.User.findOne({
    where: { email: req.body.email },
  });
  if (possibleUser) {
    const secret = process.env.JWT_SECRET + possibleUser.passwordHash;
    const payload = {
      email: possibleUser.email,
      id: possibleUser.id,
    };
    const token = jwt.sign(payload, secret, { expiresIn: "2m" });
    const link = `http://localhost:3000/reset_password/${possibleUser.id}/${token}`;
    // res.send(link);
    sendPasswordResetEmail("eliayele74@gmail.com", possibleUser.firstName, link)
      .then((response) => res.send(response.message))
      .catch((error) => console.log(error.message));
    res.status(200).send("Email Sent");
  } else res.status(404).send("Account with this email not found");
});

router.post("/reset_password/changePassword", async (req, res, next) => {
  const possibleUser = await db.User.findOne({ where: { id: req.body.id } });
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
            await possibleUser.update({
              passwordHash: hashedPassword,
              passwordSalt: salt,
              emailConfirmed: true,
            });
            // await possibleUser.save();
            // console.log("here");
            res.status(200).send("success");
          } catch (err) {
            res.json(err);
          }
          // res.redirect("http://localhost:3000/login");
        }
      );
    } catch (error) {
      return res.status(401).json(error.message);
    }
  }
});

router.get("/confirm/:id/:token", async (req, res, next) => {
  try {
    const confirmUser = await db.User.findOne({ where: { id: req.params.id } });
    if (confirmUser) {
      if (confirmUser.emailConfirmed === true) {
        res.redirect("http://localhost:3000/login");
      } else {
        const secret = process.env.JWT_SECRET + confirmUser.passwordHash;
        try {
          jwt.verify(req.params.token, secret);
        } catch (err) {
          console.log(err.message);
          res.status(500).send("jwt expired");
          return;
        }
        await confirmUser.update({ emailConfirmed: true });
        res.redirect("http://localhost:3000/login");
      }
    } else {
      res.status(500).send("Link Expired");
    }
  } catch {
    res.status(500).send("Link Expired");
  }
});

router.post("/tryAuth", authenticate("creator"), (req, res, next) => {
  res.send("Status");
});

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
          res.status(200).send({
            message: "Balance Successfully Purchased",
            balance: newBalance,
          });
        }
      }
    );
  }
);

module.exports = router;
