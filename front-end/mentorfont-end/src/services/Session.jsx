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

export const UpdateStatus = async (formdata, token) => {
  try {
    const res = await axiosInstance.post("/session/updatesession", formdata, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const GetAllSessionSer = async (token) => {
  try {
    const res = await axiosInstance.get("/session/getallsession", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
