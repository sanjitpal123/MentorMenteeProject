import axiosInstance from "./AxiosInstance";

export const CreateNotificationSer = async (data) => {
  try {
    const res = await axiosInstance.post("/notification/create", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
