const express = require("express");
const {
  isSellerAuthenticated,
  isAuthenticated,
  isAdmin,
} = require("../middleware/auth");
const {
  createWithdrawRequest,
  getAllWithdraws,
  updateWithdraw,
} = require("../controller/withdraw.controller");

const router = express.Router();

router.post(
  "/create-withdraw-request",
  isSellerAuthenticated,
  createWithdrawRequest
);
router.get(
  "/get-allWithdraw",
  isAuthenticated,
  isAdmin("Admin"),
  getAllWithdraws
);
router.put(
  "/update-withdraw/:id",
  isAuthenticated,
  isAdmin("Admin"),
  updateWithdraw
);

module.exports = router;
