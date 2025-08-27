const {
  createOrder,
  getAllOrders,
  getAllSellerOrders,
  updateOrderStatus,
  orderRefund,
} = require("../controller/order.controller");

const express = require("express");
const { isSellerAuthenticated } = require("../middleware/auth");
const router = express.Router();

router.post("/create-order", createOrder);
router.get("/get-all-orders/:userId", getAllOrders);
router.get("/get-shop-all-orders/:shopId", getAllSellerOrders);
router.patch(
  "/update-order-status/:id",
  isSellerAuthenticated,
  updateOrderStatus
);
router.put("/order-refund/:id", orderRefund);

module.exports = router;
