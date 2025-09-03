import Notification from "../Model/Notification.js";

export const CreateNotificationRepo = async (data) => {
  try {
    const res = await Notification.create(data);
    return res;
  } catch (error) {
    throw error;
  }
};
