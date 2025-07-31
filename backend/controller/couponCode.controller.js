const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const CouponCode = require("../model/couponCode.model");

//@desc: Create Coupon code
//@route: POST /api/vs/coupon/create-coupon-code
const createCouponCode = catchAsyncErrors(async (req, res, next) => {
  const isCouponCodeExists = await CouponCode.findOne({ name: req.body.name });

  if (isCouponCodeExists) {
    return next(new ErrorHandler("Coupon code already exists!", 400));
  }

  const couponCode = await CouponCode.create(req.body);

  res.status(201).json({
    success: true,
    couponCode,
  });
});

module.exports = { createCouponCode };
