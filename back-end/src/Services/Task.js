import {
  CreateTaskRepo,
  GetATaskByIdRepo,
  GetTaskForASpecificUserRepo,
} from "../Repository/Task.js";

export const CreateTaskService = async (obj) => {
  try {
    const created = await CreateTaskRepo(obj);
    return created;
  } catch (error) {
    throw error;
  }
};

export const GetTaskForASpecificUserService = async (userId) => {
  try {
    const res = await GetTaskForASpecificUserRepo(userId);
    return res;
  } catch (error) {
    throw error;
  }
};
export const GetATaskByIdService = async (id) => {
  try {
    const res = await GetATaskByIdRepo(id);
    return res;
  } catch (error) {
    throw error;
  }
};
