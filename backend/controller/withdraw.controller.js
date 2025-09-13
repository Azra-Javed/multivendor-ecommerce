const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Withdraw = require("../model/withdraw.model");
const ErrorHandler = require("../utils/ErrorHandler");
const sendMail = require("../utils/sendMail");
const Shop = require("../model/shop");
const { errorMonitor } = require("nodemailer/lib/xoauth2");

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

//@desc: get all withdraws for admins
//@route: GET /api/v2/withdraw/get-allWithdraw

const getAllWithdraws = catchAsyncErrors(async (req, res, next) => {
  try {
    const withdraws = await Withdraw.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      withdraws,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//@desc: update withdraw request status --> admin
//@route: PUT /api/v2/withdraw/update-withdraw/:id
const updateWithdraw = catchAsyncErrors(async (req, res, next) => {
  try {
    const { sellerId } = req.body;

    const withdraw = await Withdraw.findByIdAndUpdate(
      req.params.id,
      {
        status: "succeeded",
        updatedAt: Date.now(),
      },
      { new: true }
    );

    const seller = await Shop.findById(sellerId);
    const transection = {
      _id: withdraw._id,
      amount: withdraw.amount,
      updatedAt: withdraw.updatedAt,
      status: withdraw.status,
    };

    seller.transections = [...seller.transections, transection];

    await seller.save();

    try {
      await sendMail({
        email: seller.email,
        subject: "Payment Confirmation",
        message: `
           Hello ${seller.name}, Your withdraw request of ${transection.amount}$ is on the way.Delivery time deponds on your bank's rules, it usually takes 3 to 7 days.
        `,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }

    res.status(200).json({
      success: true,
      message: "Withdraw request updated successfully!",
      withdraw,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = { createWithdrawRequest, getAllWithdraws, updateWithdraw };
