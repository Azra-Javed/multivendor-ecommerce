const express = require("express");
const { upload } = require("../config/multer");
const {
  createEvent,
  getEvents,
  deleteEvent,
  getAllEvents,
} = require("../controller/event.controller");
const router = express.Router();

const { isSellerAuthenticated } = require("../middleware/auth");

router.post("/create-event", upload.array("images"), createEvent);
router.get("/get-all-events/:id", getEvents);
router.delete("/delete-shop-event/:id", isSellerAuthenticated, deleteEvent);
router.get("/get-all-events", getAllEvents);
module.exports = router;
