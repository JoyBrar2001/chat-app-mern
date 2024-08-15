const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");

const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) {
      return res
        .status(200)
        .json([]);
    }

    const messages = conversation.messages;

    return res
      .status(200)
      .json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    return res
      .status(500)
      .json({ error: "Internal server error" });
  }
}

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);


    return res
      .status(201)
      .json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage Controller", error.message);

    return res
      .status(500)
      .json({
        success: false,
        error: "Internal Server Error",
      });
  }
}

module.exports = { getMessages, sendMessage };