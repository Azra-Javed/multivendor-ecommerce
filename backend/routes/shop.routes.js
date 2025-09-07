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
} = require("../controller/shop.controller");
const {
  isSellerAuthenticated,
  isAdmin,
  isAuthenticated,
} = require("../middleware/auth");
const { upload } = require("../config/multer");
const router = express.Router();

router.post("/create-shop", upload.single("file"), createShop);
router.post("/activation", activateShop);
router.post("/shop-login", shopLogin);
router.get("/getSeller", isSellerAuthenticated, getSeller);
router.get("/logoutShop", logoutShop);
router.get("/get-shop-info/:id", getShopInfo);
router.put(
  "/update-avatar",
  isSellerAuthenticated,
  upload.single("image"),
  updateAvatar
);
router.put("/update-shop-info", isSellerAuthenticated, updateSeller);
router.get(
  "/admin-sellers",
  isAuthenticated,
  isAdmin("Admin"),
  getAdminSellers
);

module.exports = router;
