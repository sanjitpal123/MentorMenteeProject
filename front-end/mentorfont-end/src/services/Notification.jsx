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

export const GetNotification = async (token) => {
  try {
    console.log("token to get notification", token);
    const res = await axiosInstance.get("/notification/getnotfication", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log("error in getting notification", error);
    throw error;
  }
};
