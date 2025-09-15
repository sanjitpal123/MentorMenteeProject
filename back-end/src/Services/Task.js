import { CreateTaskRepo } from "../Repository/Task.js";

export const CreateTaskService = async (obj) => {
  try {
    const created = await CreateTaskRepo(obj);
    return created;
  } catch (error) {
    throw error;
  }
};
