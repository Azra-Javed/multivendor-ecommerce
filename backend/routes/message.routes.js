const express = require("express");
const { upload } = require("../config/multer");

const {
  createMessage,
  getAllMessages,
} = require("../controller/message.controller");

const router = express.Router();

router.post("/create-message", upload.single("image"), createMessage);
router.get("/get-all-messages/:id", getAllMessages);

module.exports = router;
