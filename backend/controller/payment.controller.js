const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//@desc: create payment processp
//@route: POST /api/v2/payment/process
const paymentProcess = catchAsyncErrors(async (req, res, next) => {
  const { amount } = req.body;
  console.log(amount);

  const myPayment = await stripe.paymentIntents.create({
    amount: amount * 100, //convert rupees to paisa
    currency: "pkr",
  });

  res.status(201).json({
    success: true,
    client_secret: myPayment.client_secret,
  });
});

// @desc    Get Stripe API Key
// @route   GET /api/payment/v2/stripeApikey

const stripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApikey: process.env.STRIPE_API_KEY });
});

module.exports = { paymentProcess, stripeApiKey };
