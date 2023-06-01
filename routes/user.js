const express = require("express");
const { createUser, getUserList, deleteUser } = require("../controllers/user");

const router = express.Router();

router.post("/", createUser);
router.get("/", getUserList);
router.delete("/:id", deleteUser);

module.exports = router;
