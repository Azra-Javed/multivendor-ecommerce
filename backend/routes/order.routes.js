const {
  createOrder,
  getAllOrders,
  getAllSellerOrders,
  updateOrderStatus,
  requestRefund,
  acceptRefund,
  getAdminOrders,
} = require("../controller/order.controller");

const express = require("express");
const {
  isSellerAuthenticated,
  isAdmin,
  isAuthenticated,
} = require("../middleware/auth");
const router = express.Router();

router.post("/create-order", createOrder);
router.get("/get-all-orders/:userId", getAllOrders);
router.get("/get-shop-all-orders/:shopId", getAllSellerOrders);
router.patch(
  "/update-order-status/:id",
  isSellerAuthenticated,
  updateOrderStatus
);
router.put("/order-refund/:id", requestRefund);
router.patch("/order-refund-success/:id", isSellerAuthenticated, acceptRefund);
router.get("/admin-orders", isAuthenticated, isAdmin("Admin"), getAdminOrders);

module.exports = router;
