const { createOrder, getAllOrders } = require("../controller/order.controller");

const express = require("express");
const router = express.Router();

router.post("/create-order", createOrder);
router.get("/get-all-orders/:userId", getAllOrders);

module.exports = router;
