import axiosInstance from "./AxiosInstance";

async function CreateSessionSer(FormData, token) {
  try {
    console.log("toekn to create session", token);
    const res = await axiosInstance.post("/session/create", FormData, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export default CreateSessionSer;
