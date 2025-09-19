const express = require("express");
const {
  createShop,
  activateShop,
  shopLogin,
  getSeller,
  logoutShop,
  getShopInfo,
  updateAvatar,
  updateSeller,
  getAdminSellers,
  deleteSeller,
  sellerPaymentMethods,
  deleteWithdraw,
} = require("../controller/shop.controller");
const {
  isSellerAuthenticated,
  isAdmin,
  isAuthenticated,
} = require("../middleware/auth");
const router = express.Router();

router.post("/create-shop", createShop);
router.post("/activation", activateShop);
router.post("/shop-login", shopLogin);
router.get("/getSeller", isSellerAuthenticated, getSeller);
router.get("/logoutShop", logoutShop);
router.get("/get-shop-info/:id", getShopInfo);
router.put("/update-avatar/:id", isSellerAuthenticated, updateAvatar);
router.put("/update-shop-info", isSellerAuthenticated, updateSeller);
router.get(
  "/admin-sellers",
  isAuthenticated,
  isAdmin("Admin"),
  getAdminSellers
);
router.delete(
  "/delete-seller/:id",
  isAuthenticated,
  isAdmin("Admin"),
  deleteSeller
);

router.put(
  "/update-payment-methods",
  isSellerAuthenticated,
  sellerPaymentMethods
);

router.delete("/delete-withdraw-method", isSellerAuthenticated, deleteWithdraw);

module.exports = router;
