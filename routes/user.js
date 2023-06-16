const express = require("express");
const {
  createUser,
  getUserList,
  deleteUser,
  profileVerificationRequest,
  getProfileVerificationRequestList,
  getProfileVerificationRequest,
  approveProfileVerificationRequest,
  rejectProfileVerificationRequest,
  getProfileVerificationRequestByUser,
  getUserInfo,
  updateUser,
  changePassword,
} = require("../controllers/user");

const upload = require("../middleware/upload");

const router = express.Router();

router.post("/", createUser);
router.get("/", getUserList);
router.delete("/:id", deleteUser);
router.get("/:id", getUserInfo);

router.post(
  "/profile-verification",
  upload.fields([
    { name: "governmentId", maxCount: 1 },
    { name: "proofDocument", maxCount: 1 },
  ]),
  profileVerificationRequest
);
router.get("/profile-verification", getProfileVerificationRequestList);
router.get("/profile-verification/me", getProfileVerificationRequestByUser);
router.get("/profile-verification/:id", getProfileVerificationRequest);
router.put(
  "/profile-verification/:id/approve",
  approveProfileVerificationRequest
);
router.put(
  "/profile-verification/:id/reject",
  rejectProfileVerificationRequest
);

router.put("/:id", upload.single("profilePicture"), updateUser);
router.post("/change-password/:id", changePassword);

module.exports = router;
