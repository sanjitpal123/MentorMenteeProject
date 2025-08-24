import axiosInstance from "./AxiosInstance";

async function GetAllMentosService() {
  try {
    const res = await axiosInstance.get("mentor/allmentor");
    return res.data;
  } catch (error) {
    throw error;
  }
}

export default GetAllMentosService;
