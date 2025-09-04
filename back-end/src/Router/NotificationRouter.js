import e from "express";
import { CreateNotice } from "../Controller/Notification.js";
import { Auth } from "../middleWear/Auth.js";

const NotificationRouter = e.Router();
NotificationRouter.post("/create", Auth, CreateNotice);

export default NotificationRouter;
