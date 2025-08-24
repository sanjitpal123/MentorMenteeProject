import message from "../Model/Message.js";
import { GetConvoByIdService } from "../Services/Conversation.js";
import {
  DeleteMessageService,
  EditMessageService,
  GetAllMessageOfAConvo,
  SendMessageService,
} from "../Services/Message.js";

export const SendMessage = async (req, res) => {
  try {
    const { conversation, text, isRead } = req.body;
    const sender = req.user.userId;
    console.log("conversation", conversation, "text", text, "isread", isRead);
    if (!conversation || !text) {
      return res.status(404).json({
        message: "Fill all the fields",
        success: false,
      });
    }
    const data = {
      conversation,
      text,
      isRead,
      sender,
    };
    const send = await SendMessageService(data);
    console.log("send", send);
    if (!send) {
      return res.status(401).json({
        message: "Can not send message",
        success: false,
      });
    }
    const convoId = conversation;
    console.log("convoId", convoId);
    const getConvById = await GetConvoByIdService(convoId);
    console.log("convo is here", getConvById);
    return res.status(201).json({
      success: true,
      message: "Successfully sent message",
      getConvById,
      send,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(501).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const GetUserMessage = async (req, res) => {
  try {
    const { id } = req.body;
    console.log("id to get message", id);

    if (!id) {
      return res.status(401).json({
        message: "Can not find any convo id",
      });
    }
    const messages = await GetAllMessageOfAConvo(id);
    console.log("essges", messages);
    if (!messages) {
      return res.status(404).json({
        message: "Could not get any message with this convo ",
      });
    }
    return res.status(201).json(messages);
  } catch (error) {
    console.log("errorsdfs", error);
    return res.status(501).json({
      message: "Internal server error",
      success: false,
    });
  }
};
export const DeleteMessage = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(401).json({
        message: "Id is empty",
        success: false,
      });
    }

    const deltedMessage = await DeleteMessageService(id);
    if (!deltedMessage) {
      return res.status(403)({
        message: "Can not delete",
        success: false,
      });
    }
    return res.status(201).json({
      message: "message is deleted successfully",
      deltedMessage,
    });
  } catch (error) {
    return res.status(501).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const EditMessage = async (req, res) => {
  try {
    console.log("editec", req.params.id);
    const id = req.params.id;
    const { text } = req.body;
    const EditedMessage = await EditMessageService(id, text);
    if (!EditMessage) {
      return res.status(401).json({
        message: "Can not edit message",
      });
    }
    return res.status(201).json({
      EditedMessage,
      success: "Successfullysfkskfs updated",
    });
  } catch (error) {
    console.log("error", error);
    return res.status(501).json({
      message: "Internal server error",
      success: false,
    });
  }
};
