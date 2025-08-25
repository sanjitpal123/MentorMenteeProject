import { SeenMessage } from "../Controller/Message.js";
import {
  DeletedMessageRepo,
  EditMessage,
  GetAllMessageOfAConvoRepo,
  seenMessageRepo,
  SendMessageRepo,
} from "../Repository/Message.js";

export const SendMessageService = async (data) => {
  try {
    const created = await SendMessageRepo(data);
    return created;
  } catch (error) {
    throw error;
  }
};
export const DeleteMessageService = async (id) => {
  try {
    const deleted = await DeletedMessageRepo(id);
    return deleted;
  } catch (error) {
    throw error;
  }
};

export const EditMessageService = async (id, text) => {
  try {
    const editedMessage = await EditMessage(id, text);
    return editedMessage;
  } catch (error) {
    throw error;
  }
};

export const GetAllMessageOfAConvo = async (convoid) => {
  try {
    const messages = await GetAllMessageOfAConvoRepo(convoid);
    return messages;
  } catch (error) {
    throw error;
  }
};

export const SeenMessageService = async (convoid, userId) => {
  try {
    const res = await seenMessageRepo(convoid, userId);
    return res;
  } catch (error) {
    throw error;
  }
};
