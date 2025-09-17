import axiosInstance from "./AxiosInstance";

export const CreateTaskSer = async (FormData, token) => {
  try {
    const resa = await axiosInstance.post("/task/create", FormData, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return resa.data;
  } catch (error) {
    throw error;
  }
};

export const getTask = async (token) => {
  try {
    const res = await axiosInstance.get("/task/gettask", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const GetTaskById = async (token, id) => {
  try {
    const res = await axiosInstance.get(`/task/getbyid/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
