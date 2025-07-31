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

//@desc: get all Coupon code
//@route: Get /api/vs/coupon/get-coupon/:id

const getCoupons = catchAsyncErrors(async (req, res, next) => {
  try {
    const couponCodes = await CouponCode.find({ shopId: req.seller.id });
    res.status(201).json({ success: true, couponCodes });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

//@desc: delete  Coupon code
//@route: Delete/api/vs/coupon/delete-coupon/:id

const deleteCoupon = catchAsyncErrors(async (req, res, next) => {
  try {
    const coupon = await CouponCode.findByIdAndDelete(req.params.id);

    if (!coupon) {
      return next(new ErrorHandler("Coupon code not found!", 404));
    }

    res.status(200).json({
      success: true,
      message: "Coupon code deleted successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

module.exports = { createCouponCode, getCoupons, deleteCoupon };
