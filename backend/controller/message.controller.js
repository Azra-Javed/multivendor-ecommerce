const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const Message = require("../model/messages.model");
const Conversation = require("../model/conversation.model");

//@desc create new message
//@route POST /api/v2/message/create-message
const createMessage = catchAsyncErrors(async (req, res, next) => {
  try {
    const { conversationId, sender } = req.body;

    const images = req.files ? req.files.map((file) => file.name) : [];

    const message = new Message({
      conversationId,
      sender,
      images,
    });

    await message.save();
    res.status(201).json({ sucess: true, message });
  } catch (error) {
    return next(new ErrorHandler(error.response.message, 500));
  }
});

module.exports = { createMessage };
