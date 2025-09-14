const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const Message = require("../model/messages.model");
const Conversation = require("../model/conversation.model");
const path = require("path");

//@desc create new message
//@route POST /api/v2/message/create-message
const createMessage = catchAsyncErrors(async (req, res, next) => {
  try {
    let fileUrl;
    const { conversationId, sender, text } = req.body;

    if (req.file) {
      const filename = req.file.filename;
      fileUrl = path.join(filename);
    }

    const message = new Message({
      conversationId,
      sender,
      image: fileUrl || undefined,
      text,
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
