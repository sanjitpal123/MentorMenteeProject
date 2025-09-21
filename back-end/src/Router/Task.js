import e from "express";
import {
  AttendedBy,
  createTask,
  GetAllTaskOfASpecificUser,
  GetTaskById,
} from "../Controller/Task.js";
import { Auth } from "../middleWear/Auth.js";
import { getPerformanceOfAMentee } from "../Controller/Performance.js";

const TaskRouter = e.Router();
TaskRouter.post("/create", Auth, createTask);
TaskRouter.get("/gettask", Auth, GetAllTaskOfASpecificUser);
TaskRouter.get("/getbyid/:id", Auth, GetTaskById);
TaskRouter.put("/attend", Auth, AttendedBy);
TaskRouter.post("/getperformance", Auth, getPerformanceOfAMentee);
export default TaskRouter;
