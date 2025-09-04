const express = require("express");
const {
  isSellerAuthenticated,
  isAuthenticated,
} = require("../middleware/auth");
const {
  createConversation,
  getSellerConversation,
  getUserConversation,
  updateLastMessage,
} = require("../controller/conversation.controller");

const router = express.Router();

router.post("/create-conversation", createConversation);
router.get(
  "/get-seller-conversation/:id",
  isSellerAuthenticated,
  getSellerConversation
);

router.get("/get-user-conversation/:id", isAuthenticated, getUserConversation);

router.put("/update-last-message/:id", updateLastMessage);
module.exports = router;
