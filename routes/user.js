const express = require("express");
const multer = require("multer");
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
const {
  Login,
  Register,
  RP_SendEmail,
  RP_ChangePassword,
  ConfirmUser,
  updateUser,
  getUserInfo,
  changePassword,
} = require("../controllers/user");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const {
  sendPasswordResetEmail,
  sendEmailConfirmEmail,
} = require("../middleware/sendEmail");
const { authenticate } = require("../middleware/authenticate");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + "." + file.mimetype.split("/")[1]
    );
  },
});
const fileFilter = (req, file, cb) => {
  if (file.fieldname === "profilePicture") {
    if (
      file.mimetype.split("/")[1] === "jpeg" ||
      file.mimetype.split("/")[1] === "png" ||
      file.mimetype.split("/")[1] === "jpg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
    }
  }
  // else if (file.fieldname === "video") {
  //   if (file.mimetype.split("/")[1] === "mp4") {
  //     cb(null, true);
  //   } else {
  //     cb(new Error("Video uploaded is not of type mp4"), false);
  //   }
  // }

  cb(null, true);
};

const upload = multer({ storage, fileFilter });

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

router.post("/login", Login);
router.post("/register", Register);
router.post("/reset_password/send_email", RP_SendEmail);
router.post("/reset_password/changePassword", RP_ChangePassword);
router.get("/user/:userId", getUserInfo);
router.get("/confirm/:id/:token", ConfirmUser);

// updates
// router.put("/user/:userId", upload.single("profilePicture"), updateUser);
router.put("/user/:userId", updateUser);
router.post("/user/:userId/change-password", changePassword);

router.post("/tryAuth", authenticate("creator"), (req, res, next) => {
  res.send("Status");
});

module.exports = router;
