const express = require("express");
const {
  createUser,
  userLogin,
  getUser,
  activateUser,
} = require("../controller/user.controller");
const { isAuthenticated } = require("../middleware/auth");
const { upload } = require("../config/multer");

const router = express.Router();

router.post("/create-user", upload.single("file"), createUser);
router.post("/activation", activateUser);
router.post("/login-user", userLogin);
router.get("/getuser", isAuthenticated, getUser);

module.exports = router;
