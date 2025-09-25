import Performance from "../Model/Performance.js";

export const CreatePerformanceRepo = async (data) => {
  try {
    const res = await Performance.create(data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const CheckIsExisted = async (mentee, task) => {
  try {
    console.log("mentee", mentee, "and task", task);
    const isExisted = await Performance.findOne({ mentee, task }).populate(
      "mentee"
    );
    console.log("isExisted", isExisted);

    return isExisted; // null if not found, doc if found
  } catch (error) {
    throw error;
  }
};

export const UpdateScore = async (taskid, data) => {
  try {
    const res = await Performance.findByIdAndUpdate(
      taskid,
      { $set: data },
      { new: true }
    );
    return res;
  } catch (error) {
    throw error;
  }
};
