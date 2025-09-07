const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Order = require("../model/order.model");
const Product = require("../model/product");
const ErrorHandler = require("../utils/ErrorHandler");

//@desc: create order
//@route: POST /api/v2/order/create-order
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
//@route: GET /api/v2/order/get-all-orders/:userId

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

//@desc: get all orders of a shop
//@route: GET /api/v2/order/get-all-orders/:shopId

const getAllSellerOrders = catchAsyncErrors(async (req, res, next) => {
  try {
    const shopId = req.params.shopId;
    const orders = await Order.find({ "cart.shopId": shopId }).sort({
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

//@desc: update order status for seller
//@route: put /api/v2/order/update-order-status/:id

const updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  const { status } = req.body;

  if (!order) {
    return next(new ErrorHandler("Order not found with this id", 400));
  }

  if (
    status === "Transferred to delivery partner" &&
    order.status !== "Transferred to delivery partner"
  ) {
    for (const item of order.cart) {
      // Check actual product stock from database
      const product = await Product.findById(item._id);
      if (!product) {
        return next(new ErrorHandler("Product not found", 400));
      }

      if (product.stock < item.qty) {
        return next(new ErrorHandler("Stock is limited", 400));
      }

      await updateProduct(item._id, item.qty);
    }
  }

  async function updateProduct(id, qty) {
    const product = await Product.findById(id);
    product.stock -= qty;
    product.sold_out += qty;
    await product.save({ validateBeforeSave: false });
  }

  order.status = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
    order.paymentInfo.status = "Succeeded";
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    order,
  });
});

//@desc: get a refund --> user
//@route: put /api/v2/order/order-refund/:id
const requestRefund = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this id", 400));
  }

  order.status = req.body.status;
  await order.save();

  res.status(200).json({
    success: true,
    message: "Your refund request has been submitted successfully!",
    order,
  });
});

//@desc: accept the refund --> seller
//@route: put /api/v2/order/order-refund-success/:id

const acceptRefund = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id!", 404));
  }

  order.status = req.body.status;

  await order.save();

  res.status(200).json({
    success: true,
    message: "Order Refund Successfull!",
  });

  if (req.body.status == "Refund Success") {
    for (const item of order.cart) {
      await updateProduct(item._id, item.qty);
    }
  }

  async function updateProduct(id, qty) {
    const product = await Product.findById(id);
    product.stock += qty;
    product.sold_out -= qty;
    await product.save({ validateBeforeSave: false });
  }
});

//@desc: get all orders for admin
//@route: GET /api/v2/order/admin-orders

const getAdminOrders = catchAsyncErrors(async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ deliveredAt: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = {
  createOrder,
  getAllOrders,
  getAllSellerOrders,
  updateOrderStatus,
  requestRefund,
  acceptRefund,
  getAdminOrders,
};
