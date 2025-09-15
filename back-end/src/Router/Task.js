import e from "express";
import { createTask } from "../Controller/Task.js";
import { Auth } from "../middleWear/Auth.js";

const TaskRouter = e.Router();
TaskRouter.post("/create", Auth, createTask);
export default TaskRouter;
