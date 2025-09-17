import e from "express";
import {
  createTask,
  GetAllTaskOfASpecificUser,
  GetTaskById,
} from "../Controller/Task.js";
import { Auth } from "../middleWear/Auth.js";
import { GetTaskForASpecificUserService } from "../Services/Task.js";

const TaskRouter = e.Router();
TaskRouter.post("/create", Auth, createTask);
TaskRouter.get("/gettask", Auth, GetAllTaskOfASpecificUser);
TaskRouter.get("/getbyid/:id", Auth, GetTaskById);
export default TaskRouter;
