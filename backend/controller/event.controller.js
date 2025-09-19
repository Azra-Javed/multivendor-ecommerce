const Shop = require("../model/shop");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const Event = require("../model/events.model");
const cloudinary = require("cloudinary");

//@desc: Create event
//@route: POST /api/vs/event/create-event
const createEvent = catchAsyncErrors(async (req, res, next) => {
  try {
    const shopId = req.body.shopId;

    const shop = await Shop.findById(shopId);

    if (!shop) {
      return next(new ErrorHandler("Shop Id is invalid", 400));
    }

    const imageFiles = req.files?.images;
    let images = [];

    if (imageFiles) {
      // if single file uploaded
      if (!Array.isArray(imageFiles)) {
        const result = await cloudinary.v2.uploader.upload(
          imageFiles.tempFilePath,
          {
            folder: "events",
          }
        );
        images.push({ public_id: result.public_id, url: result.secure_url });
      } else {
        // multiple files
        for (let file of imageFiles) {
          const result = await cloudinary.v2.uploader.upload(
            file.tempFilePath,
            {
              folder: "products",
            }
          );
          images.push({ public_id: result.public_id, url: result.secure_url });
        }
      }
    }

    const eventData = {
      ...req.body,
      images,
      shop,
    };

    const event = await Event.create(eventData);

    res.status(201).json({
      success: true,
      event,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

//@desc: get all events of a shop
//@route: POST /api/vs/event/get-all-events/id
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

//@desc: get all events
//@route: GET /api/v2/event/get-all-events

const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

//@desc: delete an event
//@route: DELETE /api/v2/event/delete-shop-event/:id

const deleteEvent = catchAsyncErrors(async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return next(new ErrorHandler("Event not found", 404));
    }

    for (const image of event.images) {
      await cloudinary.uploader.destroy(image.public_id);
    }

    await event.deleteOne();

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = { createEvent, getEvents, deleteEvent, getAllEvents };
