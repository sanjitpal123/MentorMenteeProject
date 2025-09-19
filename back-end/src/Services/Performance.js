import { CreatePerformanceRepo } from "../Repository/Performance.js";

export const CreatePerformanceService = async (data) => {
  try {
    const res = await CreatePerformanceRepo(data);
    return res;
  } catch (error) {
    throw error;
  }
};
