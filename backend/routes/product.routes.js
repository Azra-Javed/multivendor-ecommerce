const express = require("express");
const {
  createProduct,
  getProducts,
  deleteProduct,
  getAllProducts,
  createReview,
} = require("../controller/product.controller");
const router = express.Router();
const {
  isSellerAuthenticated,
  isAuthenticated,
} = require("../middleware/auth");

router.post("/create-product", createProduct);
router.get("/get-all-products-shop/:id", getProducts);
router.get("/get-all-products", getAllProducts);
router.delete("/delete-shop-product/:id", isSellerAuthenticated, deleteProduct);
router.put("/create-new-review", isAuthenticated, createReview);

module.exports = router;
