import {
  CheckIsExisted,
  CreatePerformanceRepo,
  UpdateScore,
} from "../Repository/Performance.js";

export const CreatePerformanceService = async (data) => {
  try {
    const res = await CreatePerformanceRepo(data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const isCheckedExistedScoreService = async (mentee, task) => {
  try {
    const res = await CheckIsExisted(mentee, task);
    return res;
  } catch (error) {
    throw error;
  }
};
export const updatedScoreService = async (id, data) => {
  try {
    const res = await UpdateScore(id, data);
    return res;
  } catch (error) {
    throw error;
  }
};
