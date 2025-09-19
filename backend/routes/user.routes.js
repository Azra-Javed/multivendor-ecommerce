const express = require("express");
const {
  createUser,
  userLogin,
  getUser,
  activateUser,
  logoutUser,
  updateUser,
  updateAvatar,
  updateAddress,
  deleteUserAddress,
  updatePassword,
  getUserInfo,
  getAdminUsers,
  deleteUser,
} = require("../controller/user.controller");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const router = express.Router();

router.post("/create-user", createUser);
router.post("/activation", activateUser);
router.post("/login-user", userLogin);
router.get("/getuser", isAuthenticated, getUser);
router.get("/logoutUser", isAuthenticated, logoutUser);
router.put("/update-user-info", isAuthenticated, updateUser);
router.put("/update-avatar/:id", isAuthenticated, updateAvatar);
router.put("/update-user-addresses", isAuthenticated, updateAddress);
router.delete("/delete-user-address/:id", isAuthenticated, deleteUserAddress);
router.put("/update-user-password", isAuthenticated, updatePassword);
router.get("/user-info/:id", getUserInfo);
router.get("/admin-users", isAuthenticated, isAdmin("Admin"), getAdminUsers);
router.delete(
  "/delete-user/:id",
  isAuthenticated,
  isAdmin("Admin"),
  deleteUser
);

module.exports = router;
