import express from "express";
import {
  DeleteMessage,
  EditMessage,
  GetUserMessage,
  SendMessage,
} from "../Controller/Message.js";
import { Auth } from "../middleWear/Auth.js";
const MessageRouter = express.Router();
MessageRouter.post("/", Auth, SendMessage);
MessageRouter.delete("/deletemessage/:id", Auth, DeleteMessage);
MessageRouter.get("/editmessage/:id", Auth, EditMessage);
MessageRouter.post("/getconvomessage", Auth, GetUserMessage);

export default MessageRouter;
