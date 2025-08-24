const {
  paymentProcess,
  stripeApiKey,
} = require("../controller/payment.controller.js");

const express = require("express");
const router = express.Router();

router.post("/process", paymentProcess);
router.get("/stripeApikey", stripeApiKey);

module.exports = router;
