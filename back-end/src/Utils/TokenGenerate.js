import jwt from "jsonwebtoken";
import dotenv from "dotenv";
export const GenerateToken = async (user) => {
  try {
    const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
      expiresIn: "30d",
    });
    return token;
  } catch (error) {
    throw error;
  }
};
