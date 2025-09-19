import message from "../Model/Message";
import { CreatePerformanceService } from "../Services/Performance";

export const createPerformance = async (req, res) => {
  try {
    const { totalQuestion, score, mentee, task } = req.body;
    const CreatePerformance = await CreatePerformanceService({
      totalQuestion,
      score,
      mentee,
      task,
    });
    if (!createPerformance) {
      return res.status(403).json({
        message: "Can not create performance",
        success: false,
      });
    }
    return res.status(201).json({
      message: "Create performance successfully",
      CreatePerformance,
    });
  } catch (error) {
    console.log("error to create performance", error);
    return res.status(501).json({
      message: "Internal server error",
      success: false,
    });
  }
};
