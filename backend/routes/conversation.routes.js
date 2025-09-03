const express = require("express");
const { isSellerAuthenticated } = require("../middleware/auth");
const {
  createConversation,
  getSellerConversation,
  updateLastMessage,
} = require("../controller/conversation.controller");

const router = express.Router();

router.post("/create-conversation", createConversation);
router.get(
  "/get-seller-conversation/:id",
  isSellerAuthenticated,
  getSellerConversation
);
router.put("/update-last-message/:id", updateLastMessage);
module.exports = router;
