import { CreateTaskService } from "../Services/Task.js";

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
