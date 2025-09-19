import Performance from "../Model/Performance.js";

export const CreatePerformanceRepo = async (data) => {
  try {
    const res = await Performance.create(data);
    return res;
  } catch (error) {
    throw error;
  }
};
