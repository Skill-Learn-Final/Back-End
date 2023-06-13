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

// // Handle Local Login

const Login = async (req, res, next) => {
  const possibleUser = await db.User.findOne({
    where: { email: req.body.email },
  });
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
        // if (possibleUser.emailConfirmed === false) {
        //   res
        //     .status(401)
        //     .send("You need to confirm your email before continuing ");
        // }
        try {
          const role = await db.UserRole.findAll({
            where: { userId: possibleUser.id },
          });
          if (role.length === 1) {
            // possibleUser.setDataValue("role", role[0].role);
            // res.send(possibleUser);
            const userInfo = {
              id: possibleUser.id,
              balance: possibleUser.balance,
              role: role,
            };
            const secret = process.env.JWT_SECRET + possibleUser.passwordHash;
            const payload = {
              id: possibleUser.id,
              email: possibleUser.email,
              role: role[0].role,
            };

            const token = jwt.sign(payload, secret, { expiresIn: "1d" });
            res
              .cookie("access_token", token, {
                httpOnly: false,
                secure: process.env.NODE_ENV === "production",
              })
              .status(200)
              .send(userInfo);
          } else {
            res.send("More than one role! You need to choose");
          }

          // res.send(role[0].role);
        } catch (err) {
          console.log(err.message);
          // return res.send(err.message);
        }
      }
    );
  } else {
    res.status(404).json("We couldn't find an account with the provided Email");
  }
};

// router.post(
//   "/login",
//   passport.authenticate("local", { session: false }),
//   function (req, res) {
//     // console.log(req.user);
//     res.send(req.user);
//   }
// );

// Handle Local Register

// Handle Local Register

const Register = async (req, res, next) => {
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
        const createdUser = await db.User.create({
          // username: req.body.username,
          email: req.body.email,
          firstName: req.body.fullName.split(" ")[0],
          lastName: req.body.fullName.split(" ")[1],
          passwordHash: hashedPassword,
          passwordSalt: salt,
        });
        await createdUser.save();

        const userRole = await db.UserRole.create({
          userId: createdUser.id,
          role: req.body.role,
        });
        await userRole.save();

        const secret = process.env.JWT_SECRET + createdUser.passwordHash;
        const payload = {
          email: createdUser.email,
          id: createdUser.id,
          role: req.body.role,
        };
        const token = jwt.sign(payload, secret, { expiresIn: "1d" });
        const link = `http://localhost:5000/api/local/confirm/${createdUser.id}/${token}`;
        sendEmailConfirmEmail(createdUser.email, createdUser.firstName, link)
          .then((response) => res.send(response.message))
          .catch((error) => res.send(error.message));
      } catch (err) {
        return res.status(409).json(err);
      }
    }
  );
};

// get user info

const getUserInfo = async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: { id: req.params.userId },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const userInfo = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profilePicture: user.profilePicture,
      balance: user.balance,
      passwordHash: user.passwordHash,
      emailConfirmed: user.emailConfirmed,
    };
    res.status(200).json(userInfo);
  } catch (error) {
    next(error);
  }
};

const RP_SendEmail = async (req, res, next) => {
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
};

const RP_ChangePassword = async (req, res, next) => {
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
            await possibleUser.update({ passwordHash: hashedPassword });
            await possibleUser.update({ passwordSalt: salt });
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
};

const ConfirmUser = async (req, res, next) => {
  const confirmUser = await db.User.findOne({ where: { id: req.params.id } });
  if (confirmUser) {
    if (confirmUser.emailConfirmed === true) {
      res.redirect("http://localhost:3000/login");
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
  } else {
    res.status(500).send("Link Expired");
  }
};

// update fields
const updateUser = async (req, res, next) => {
  try {
    const { userId, fields } = req.body;
    // if (req.file) {
    //   fields.profilePicture = `${req.protocol}://${req.hostname}:8080/uploads/${req.file.filename}`;
    // }
    const possibleUser = await db.User.findOne({ where: { id: userId } });
    await possibleUser.update(fields);
    console.log(`USER ID : [${userId}]`);
    console.log(`FIELDS : [${fields}]`);
    res
      .status(200)
      .json({ success: true, message: "User fields updated successfully." });
  } catch (error) {
    next(error);
  }
};
// password
const changePassword = async (req, res, next) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;
    const user = await db.User.findOne({ where: { id: req.body.userId } });

    // const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    crypto.pbkdf2(
      oldPassword,
      user.passwordSalt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        if (err) {
          return next(err);
        }

        if (!crypto.timingSafeEqual(user.passwordHash, hashedPassword)) {
          return res.status(401).json({ error: "Incorrect old password" });
        }

        const salt = crypto.randomBytes(16);
        crypto.pbkdf2(
          newPassword,
          salt,
          310000,
          32,
          "sha256",
          async function (err, newHashedPassword) {
            if (err) {
              return next(err);
            }

            await user.update({
              passwordHash: newHashedPassword,
              passwordSalt: salt,
            });

            res.status(200).json({
              success: true,
              message: "Password changed successfully",
            });
          }
        );
      }
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  Login,
  Register,
  RP_SendEmail,
  RP_ChangePassword,
  ConfirmUser,
  updateUser,
  getUserInfo,
  changePassword,
};
