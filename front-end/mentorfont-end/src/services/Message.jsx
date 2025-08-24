import axiosInstance from "./AxiosInstance";

export const sendMessage = async (data, token) => {
  try {
    const res = await axiosInstance.post("/message", data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const GetAllMessageSer = async (id, token) => {
  try {
    const res = await axiosInstance.post(
      "message/getconvomessage",
      { id },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const SeenMessage = async (convoId, token) => {
  try {
    const res = await axiosInstance.post(
      "/message/mark_seen",
      { convoId },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
