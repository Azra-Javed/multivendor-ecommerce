const Conversation = require("../model/conversation.model");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");

//@desc: create a new conversation
//@route: POST /api/v2/converesation/create-conversation

const createConversation = catchAsyncErrors(async (req, res, next) => {
  try {
    const { userId, sellerId } = req.body;

    const isConversationExist = await Conversation.findOne({
      participants: { $all: [userId, sellerId] },
    });

    if (isConversationExist) {
      const conversation = isConversationExist;

      res.status(200).json({
        success: true,
        conversation: isConversationExist,
      });
    } else {
      const conversation = await Conversation.create({
        participants: [userId, sellerId],
      });

      res.status(201).json({
        success: true,
        conversation,
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error.message), 500);
  }
});

//@desc get seller conversation
//@route POST /api/v2/message/get-seller-conversation

const getSellerConversation = catchAsyncErrors(async (req, res, next) => {
  try {
    const conversations = await Conversation.find({
      participants: { $in: [req.params.id] },
    }).sort({ updatedAt: -1, createdAt: -1 });

    res.status(200).json({
      sucess: true,
      conversations,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//@desc get seller conversation
//@route POST /api/v2/message/get-seller-conversation

const getUserConversation = catchAsyncErrors(async (req, res, next) => {
  try {
    const conversations = await Conversation.find({
      participants: { $in: [req.params.id] },
    }).sort({ updatedAt: -1, createdAt: -1 });

    res.status(200).json({
      sucess: true,
      conversations,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//@desc create new message
//@route POST /api/v2/conversation/update-last-message.:id
const updateLastMessage = catchAsyncErrors(async (req, res, next) => {
  try {
    const { lastMessage, lastMessageId } = req.body;

    const conversation = await Conversation.findByIdAndUpdate(req.params.id, {
      lastMessage,
      lastMessageId,
    });

    res.status(200).json({
      success: true,
      conversation,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = {
  createConversation,
  getSellerConversation,
  updateLastMessage,
  getUserConversation,
};
