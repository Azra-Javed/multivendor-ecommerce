const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { upload } = require("../config/multer");
const { createProduct } = require("../controller/product.controller");
const router = express.Router();

router.post("/create-product", upload.array("images"), createProduct);

module.exports = router;
