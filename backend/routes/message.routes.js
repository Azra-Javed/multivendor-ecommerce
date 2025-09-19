const express = require("express");

const {
  createMessage,
  getAllMessages,
} = require("../controller/message.controller");

const router = express.Router();

router.post("/create-message", createMessage);
router.get("/get-all-messages/:id", getAllMessages);

module.exports = router;
