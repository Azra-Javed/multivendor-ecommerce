const { isAuthenticated } = require("../middleware/auth");
const { createOrder } = require("../controller/order.controller");

const express = require("express");
const router = express.Router();

router.post("/create-order", createOrder);

module.exports = router;
