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
