const express = require("express");
const { createShop, activateShop } = require("../controller/shop.controller");
const { isAuthenticated } = require("../middleware/auth");
const { upload } = require("../config/multer");
const router = express.Router();

router.post("/create-shop", upload.single("file"), createShop);
router.post("/activation", activateShop);

module.exports = router;
