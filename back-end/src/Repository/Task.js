import Task from "../Model/Task.js";

export const CreateTaskRepo = async (obj) => {
  try {
    const created = await Task.create(obj);
    return created;
  } catch (error) {
    throw error;
  }
};

export const GetTaskForASpecificUserRepo = async (userId) => {
  try {
    const res = await Task.find({
      $or: [{ CreatedBy: userId }, { Mentees: { $in: [userId] } }],
    });
    return res;
  } catch (error) {
    throw error;
  }
};
