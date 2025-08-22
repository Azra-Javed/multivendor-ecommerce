const express = require("express");
const {
  createCouponCode,
  getCoupons,
  deleteCoupon,
  getCouponValue,
} = require("../controller/couponCode.controller");
const { isSellerAuthenticated } = require("../middleware/auth");
const router = express.Router();

router.post("/create-coupon-code", createCouponCode);
router.get("/get-coupon/:id", isSellerAuthenticated, getCoupons);
router.delete("/delete-coupon/:id", isSellerAuthenticated, deleteCoupon);
router.get("/get-coupon-value/:name", getCouponValue);

module.exports = router;
