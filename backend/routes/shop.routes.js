const express = require("express");
const {
  createShop,
  activateShop,
  shopLogin,
  getSeller,
} = require("../controller/shop.controller");
const { isAuthenticated } = require("../middleware/auth");
const { upload } = require("../config/multer");
const router = express.Router();

router.post("/create-shop", upload.single("file"), createShop);
router.post("/activation", activateShop);
router.post("/shop-login", shopLogin);
router.get("getSeller", getSeller);

module.exports = router;
