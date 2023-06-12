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
    const { role } = req.query;

    const users = await db.User.findAll({
      attributes: { exclude: ["passwordHash", "passwordSalt"] },
      include: [
        {
          model: db.UserRole,
          as: "roles",
          attributes: ["role"],
          where: role ? { role } : {},
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

const profileVerificationRequest = async (req, res, next) => {
  try {
    const { professionalTitle, address } = req.body;
    const { governmentId, proofDocument } = req.files;

    const request = await db.ProfileVerification.create({
      creatorId: "639ae82a-a775-49e0-8b26-9e247d73628f",
      professionalTitle,
      address,
      governmentIdLink: `${req.protocol}://${req.hostname}:8080/uploads/${governmentId[0].filename}`,
      proofDocumentLink: `${req.protocol}://${req.hostname}:8080/uploads/${proofDocument[0].filename}`,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getProfileVerificationRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const request = await db.ProfileVerification.findOne({
      where: { id },
      include: [
        {
          model: db.User,
          as: "creator",
          attributes: ["firstName", "lastName", "email"],
        },
      ],
    });
    if (!request) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Request not found",
      });
    }
    res.status(StatusCodes.OK).json(request);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getProfileVerificationRequestByUser = async (req, res, next) => {
  try {
    const { creatorId } = req.query;

    if (!creatorId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "creatorId is required",
      });
    }

    const request = await db.ProfileVerification.findOne({
      where: { creatorId },
      include: [
        {
          model: db.User,
          as: "creator",
          attributes: ["firstName", "lastName", "email"],
        },
      ],
    });

    res.status(StatusCodes.OK).json(request);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const approveProfileVerificationRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const request = await db.ProfileVerification.findOne({
      where: { id },
    });
    if (!request) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Request not found",
      });
    }

    if (request.isReviewed) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Request already reviewed",
      });
    }

    request.isApproved = true;
    request.isReviewed = true;
    await request.save();
    res.status(StatusCodes.OK).json({
      message: "Request approved successfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const rejectProfileVerificationRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const request = await db.ProfileVerification.findOne({
      where: { id },
    });
    if (!request) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Request not found",
      });
    }

    if (request.isReviewed) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Request already reviewed",
      });
    }

    request.isApproved = false;
    request.isReviewed = true;
    await request.save();

    res.status(StatusCodes.OK).json({
      message: "Request rejected successfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getProfileVerificationRequestList = async (req, res, next) => {
  try {
    let filter = {};
    const { status } = req.query;

    if (status === "approved") {
      filter = { isApproved: true };
    } else if (status === "rejected") {
      filter = { isApproved: false, isReviewed: true };
    } else if (status === "pending") {
      filter = { isReviewed: false };
    } else {
      filter = {};
    }

    const requests = await db.ProfileVerification.findAll({
      where: filter,
      include: [
        {
          model: db.User,
          as: "creator",
          attributes: ["firstName", "lastName", "email"],
        },
      ],
    });
    res.status(StatusCodes.OK).json(requests);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  createUser,
  getUserList,
  deleteUser,
  profileVerificationRequest,
  getProfileVerificationRequest,
  approveProfileVerificationRequest,
  rejectProfileVerificationRequest,
  getProfileVerificationRequestList,
  getProfileVerificationRequestByUser,
};
