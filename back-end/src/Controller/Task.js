import message from "../Model/Message.js";
import {
  CreateTaskService,
  GetATaskByIdService,
  GetTaskForASpecificUserService,
} from "../Services/Task.js";

export const createTask = async (req, res) => {
  try {
    const { Title, Description, Duedate, Questions, Mentees } = req.body;
    const Mentor = req.user.userId;
    console.log("titile", Title, "Description", Description);
    const obj = {
      Title,
      Description,
      Duedate,
      Questions,
      Mentees,
      CreatedBy: Mentor,
    };
    const createTask = await CreateTaskService(obj);
    if (!createTask) {
      return req.status(403).json({
        message: "Could not create task",
        success: false,
      });
    }
    return res.status(201).json({
      message: "Create new task",
      success: true,
      createTask,
    });
  } catch (error) {
    console.log("error to create task", error);
    return res.status(501).json({
      message: "Internal server error ",
      success: false,
    });
  }
};

export const GetAllTaskOfASpecificUser = async (req, res) => {
  try {
    const userid = req.user.userId;
    console.log("user id to get message", userid);
    const result = await GetTaskForASpecificUserService(userid);
    if (!result) {
      return res.status(404).json({
        message: "Could not get task",
        success: false,
      });
    }
    return res.status(201).json(result);
  } catch (error) {
    console.log("error to get all task", error);
    return res.status(501).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
export const GetTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id to get task", id);
    const result = await GetATaskByIdService(id);
    if (!result) {
      return res.status(404).json({
        message: "Can not find any task",
        success: false,
      });
    }
    return res.status(201).json(result);
  } catch (error) {
    return req.status(501).json({
      message: "Internal server error",
      success: false,
    });
  }
};
