const express = require("express");
const { createCouponCode } = require("../controller/couponCode.controller");
const router = express.Router();

router.post("/create-coupon-code", createCouponCode);

module.exports = router;
