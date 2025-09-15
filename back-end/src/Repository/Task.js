import Task from "../Model/Task.js";

export const CreateTaskRepo = async (obj) => {
  try {
    const created = await Task.create(obj);
    return created;
  } catch (error) {
    throw error;
  }
};
