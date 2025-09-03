import { CreateNotificationRepo } from "../Repository/Notification.js";

export const CreateNotificationService = async (data) => {
  try {
    const res = await CreateNotificationRepo(data);
    return res;
  } catch (error) {
    throw error;
  }
};
