import { CreateFeedbackService } from "../Services/FeedBack.js";

export const CreateFeedBack = async (req, res) => {
  try {
    const { mentee, mentor, comment } = req.body;
    if (!mentee || !mentor || !comment) {
      return res.status(201).json({
        message: "fields are missing , please fill all the field",
      });
    }

    const created = await CreateFeedbackService({ mentee, mentor, comment });
    if (!created) {
      return res.status(403).json({
        message: "Could not create feedback",
        success: true,
      });
    }
    return res.status(201).json({
      message: "Created Feedback",
      created,
      success: true,
    });
  } catch (error) {
    console.log("error", error);
  }
};
