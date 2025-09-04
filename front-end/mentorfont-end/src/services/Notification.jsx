import axiosInstance from "./AxiosInstance";

export const CreateNotificationSer = async (data, token) => {
  try {
    const res = await axiosInstance.post("/notification/create", data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
