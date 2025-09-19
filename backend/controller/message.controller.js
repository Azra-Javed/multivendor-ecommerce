const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const Message = require("../model/messages.model");
const cloudinary = require("cloudinary");

//@desc create new message
//@route POST /api/v2/message/create-message
const createMessage = catchAsyncErrors(async (req, res, next) => {
  try {
    let imageData;
    const { conversationId, sender, text } = req.body;

    const image = req.files?.image;
    if (image) {
      const result = await cloudinary.v2.uploader.upload(image.tempFilePath, {
        folder: "messages",
      });

      imageData = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    const message = new Message({
      conversationId,
      sender,
      text,
      image: imageData,
    });

    await message.save();
    res.status(201).json({ success: true, message });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//@desc get all messages by conversation id
//@route POST /api/v2/message/get-all-messages

const getAllMessages = catchAsyncErrors(async (req, res, next) => {
  try {
    const message = await Message.find({
      conversationId: req.params.id,
    });

    res.status(200).json({
      success: true,
      message,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
module.exports = { createMessage, getAllMessages };
