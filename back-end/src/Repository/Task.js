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
    })
      .populate({ path: "Mentees", select: "-password" })
      .populate({ path: "CreatedBy", select: "-password" });
    return res;
  } catch (error) {
    throw error;
  }
};

export const GetATaskByIdRepo = async (id) => {
  try {
    const result = await Task.findById(id);
    console.log("result in repo", result);
    return result;
  } catch (error) {
    throw error;
  }
};
export const whoAttendRepo = async (id, mentee) => {
  try {
    const result = await Task.findByIdAndUpdate(
      id,
      { $addToSet: { AttendedBy: mentee } },
      { new: true }
    );
    return result;
  } catch (error) {
    throw error;
  }
};
