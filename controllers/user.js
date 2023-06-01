const db = require("../database/models");
const crypto = require("crypto");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { sendPasswordResetEmail } = require("../middleware/sendEmail");
const { StatusCodes } = require("http-status-codes");

const createUser = (req, res, next) => {
  try {
    let { firstName, lastName, email, role } = req.body;
    let password = crypto.randomBytes(16).toString("hex");

    var salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, passwordHash) {
        if (err) {
          return next(err);
        }
        try {
          const createdUser = await db.User.create(
            {
              // username: req.body.username,
              email,
              firstName,
              lastName,
              passwordHash,
              passwordSalt: salt,
              roles: [
                {
                  role,
                },
              ],
            },
            { include: ["roles"] }
          );

          const secret = process.env.JWT_SECRET + createdUser.passwordHash;
          const payload = {
            email: createdUser.email,
            id: createdUser.id,
          };
          const token = jwt.sign(payload, secret, { expiresIn: "2m" });
          const link = `http://localhost:3000/reset_password/${createdUser.id}/${token}`;
          // res.send(link);
          sendPasswordResetEmail(email, createdUser.firstName, link)
            .then((response) => res.send(response.message))
            .catch((error) => console.log(error.message));
          res.status(200).send("Email Sent");
        } catch (err) {
          console.log(err);
          return res.status(409).json(err);
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const getUserList = async (req, res, next) => {
  try {
    const users = await db.User.findAll({
      attributes: { exclude: ["passwordHash", "passwordSalt"] },
      include: [
        {
          model: db.UserRole,
          as: "roles",
          attributes: ["role"],
        },
      ],
    });
    res.status(StatusCodes.OK).json(users);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await db.User.findOne({ where: { id } });
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "User not found",
      });
    }
    await user.destroy();
    res.status(StatusCodes.OK).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  createUser,
  getUserList,
  deleteUser,
};
