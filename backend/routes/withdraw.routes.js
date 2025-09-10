const express = require("express");
const { isSellerAuthenticated } = require("../middleware/auth");
const { createWithdrawRequest } = require("../controller/withdraw.controller");

const router = express.Router();

router.post(
  "/create-withdraw-request",
  isSellerAuthenticated,
  createWithdrawRequest
);

module.exports = router;
