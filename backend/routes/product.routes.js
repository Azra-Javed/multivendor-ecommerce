const express = require("express");
const { upload } = require("../config/multer");
const {
  createProduct,
  getProducts,
  deleteProduct,
  getAllProducts,
} = require("../controller/product.controller");
const router = express.Router();
const { isSellerAuthenticated } = require("../middleware/auth");

router.post("/create-product", upload.array("images"), createProduct);
router.get("/get-all-products-shop/:id", getProducts);
router.get("/get-all-products", getAllProducts);
router.delete("/delete-shop-product/:id", isSellerAuthenticated, deleteProduct);

module.exports = router;
