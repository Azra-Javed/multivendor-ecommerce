const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Order = require("../model/order.model");
const ErrorHandler = require("../utils/ErrorHandler");

const createOrder = catchAsyncErrors(async (req, res, next) => {
  try {
    const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

    // group cart items by shop id
    const shopItemsMap = new Map();

    for (const item of cart) {
      const shopId = item.shopId;

      if (!shopItemsMap.has(shopId)) {
        shopItemsMap.set(shopId, []);
      }

      shopItemsMap.get(shopId).push(item);
    }

    const orders = [];
    for (const [shop, items] of shopItemsMap) {
      const order = await Order.create({
        cart: items,
        shippingAddress,
        user,
        totalPrice,
        paymentInfo,
      });
      orders.push(order);
    }

    res.status(201).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
});

module.exports = { createOrder };
