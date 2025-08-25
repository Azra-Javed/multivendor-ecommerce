const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Order = require("../model/order.model");
const ErrorHandler = require("../utils/ErrorHandler");

//@desc: create order
//@route: POST /api/v2/payment/create-order
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
    return next(new ErrorHandler(error.message, 500));
  }
});

//@desc: get all orders of user
//@route: GET /api/v2/payment/get-all-orders/:userId

const getAllOrders = catchAsyncErrors(async (req, res, next) => {
  try {
    const orders = await Order.find({ "user._id": req.params.userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
module.exports = { createOrder, getAllOrders };
