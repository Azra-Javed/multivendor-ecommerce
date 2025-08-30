const express = require("express");
const { upload } = require("multer");

const { createMessage } = require("../controller/message.controller");

const router = express.Router();

router.post("/create-message", upload.array("images"), createMessage);

module.exports = router;
