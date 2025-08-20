const express = require("express");
const {
  createUser,
  userLogin,
  getUser,
  activateUser,
  logoutUser,
  updateUser,
  updateAvatar,
  upddateAddress,
  deleteUserAddress,
} = require("../controller/user.controller");
const { isAuthenticated } = require("../middleware/auth");
const { upload } = require("../config/multer");
const router = express.Router();

router.post("/create-user", upload.single("file"), createUser);
router.post("/activation", activateUser);
router.post("/login-user", userLogin);
router.get("/getuser", isAuthenticated, getUser);
router.get("/logoutUser", isAuthenticated, logoutUser);
router.put("/update-user-info", isAuthenticated, updateUser);
router.put(
  "/update-avatar",
  isAuthenticated,
  upload.single("image"),
  updateAvatar
);
router.put("/update-user-addresses", isAuthenticated, upddateAddress);
router.delete("/delete-user-address/:id", isAuthenticated, deleteUserAddress);

module.exports = router;
