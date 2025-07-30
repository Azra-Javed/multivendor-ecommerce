const mongoose = require("mongoose");

const couponCodeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your coupoun code!"],
      unique: true,
    },
    value: {
      type: Number,
      required: true,
    },
    minAmount: {
      type: Number,
    },
    maxAmount: {
      type: Number,
    },
    shop: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CouponCode", couponCodeSchema);
