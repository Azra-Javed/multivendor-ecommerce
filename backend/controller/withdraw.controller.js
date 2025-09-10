const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Withdraw = require("../model/withdraw.model");
const ErrorHandler = require("../utils/ErrorHandler");
const sendMail = require("../utils/sendMail");
const Shop = require("../model/shop");

//@desc: create withdraw request for seller
//@route: POST /api/v2/withdraw/create-withdraw-request
const createWithdrawRequest = catchAsyncErrors(async (req, res, next) => {
  try {
    const { amount } = req.body;

    const data = {
      seller: req.seller,
      amount,
    };

    const withdraw = await Withdraw.create(data);

    const shop = await Shop.findById(req.seller._id);
    shop.availableBalance -= amount;

    await shop.save();

    try {
      await sendMail({
        email: req.seller.email,
        subject: "Withdraw Request",
        message: `
        Hello ${req.seller.name}, We have received your withdraw request of ${amount}.
          Your request is currently processing. Please wait while we complete verification and transfer.
        `,
      });
    } catch (error) {
      return next(
        new ErrorHandler("Email could not be sent: " + error.message, 500)
      );
    }

    res.status(201).json({
      success: true,
      withdraw,
      message: "Withdraw request created and email sent successfully.",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = { createWithdrawRequest };
