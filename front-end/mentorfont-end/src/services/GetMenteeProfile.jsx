import axiosInstance from "./AxiosInstance";

async function GetMenteeprofileser(id) {
  try {
    console.log("id si hrer", id);
    const res = await axiosInstance.get(`mentee/getamentee/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}
export default GetMenteeprofileser;
