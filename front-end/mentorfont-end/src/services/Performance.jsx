import axiosInstance from "./AxiosInstance";

export const StoreScore = async (token, obj) => {
  try {
    console.log("data", obj);
    const res = await axiosInstance.post(
      "/performance/createscore",
      obj, // ✅ send directly
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log("obje", obj);
    throw error;
  }
};

export const GetPerformanceOfMentee = async (token, obj) => {
  try {
    const res = await axiosInstance.get("/task/getperformance", obj, {
      headers: {
        authorization: `Bearer ${token}`, // <-- Make sure A is capital
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
