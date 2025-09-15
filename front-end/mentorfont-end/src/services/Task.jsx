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
