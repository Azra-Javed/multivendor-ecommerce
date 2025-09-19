const express = require("express");
const {
  createEvent,
  getEvents,
  deleteEvent,
  getAllEvents,
} = require("../controller/event.controller");
const { isSellerAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.post("/create-event", createEvent);
router.get("/get-all-events/:id", getEvents);
router.delete("/delete-shop-event/:id", deleteEvent);
router.get("/get-all-events", getAllEvents);
module.exports = router;
