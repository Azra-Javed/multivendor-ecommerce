const express = require("express");
const { upload } = require("../config/multer");
const { createEvent } = require("../controller/event.controller");
const router = express.Router();

router.post("/create-event", upload.array("images"), createEvent);

module.exports = router;
