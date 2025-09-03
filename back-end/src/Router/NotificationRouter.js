import e from "express";
import { CreateNotice } from "../Controller/Notification.js";

const NotificationRouter = e.Router();
NotificationRouter.post("/create", CreateNotice);

export default NotificationRouter;
