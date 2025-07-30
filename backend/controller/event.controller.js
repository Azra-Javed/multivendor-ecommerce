const Shop = require("../model/shop");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const Event = require("../model/events.model");

//@desc: Create event
//@route: POST /api/vs/event/create-event
const createEvent = catchAsyncErrors(async (req, res, next) => {
  try {
    const shopId = req.body.shopId;

    const shop = await Shop.findById(shopId);

    if (!shop) {
      return next(new ErrorHandler("Shop Id is invalid", 400));
    } else {
      const files = req.files;
      const imageUrls = files.map((file) => `${file.filename}`);
      const eventData = req.body;
      eventData.images = imageUrls;
      eventData.shop = shop;

      const event = await Event.create(eventData);

      res.status(201).json({
        success: true,
        event,
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

//@desc: get all products
//@route: POST /api/vs/product/get-all-events/id
const getEvents = catchAsyncErrors(async (req, res, next) => {
  try {
    const events = await Event.find({ shopId: req.params.id });

    res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

//@desc: delete a product
//@route: DELETE /api/v2/product/delete-shop-event/:id

const deleteEvent = catchAsyncErrors(async (req, res, next) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return next(new ErrorHandler("Event not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = { createEvent, getEvents, deleteEvent };
