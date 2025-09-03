import { CreateNotificationService } from "../Services/Notification";

import User from "../Model/UserSchema.js";
export const CreateNotice = async (req, res) => {
  try {
    const { receiver, message, type, isRead } = req.body;
    const Created = await CreateNotificationService({
      receiver,
      message,
      type,
      isRead,
    });

    if (!Created) {
      return res.status(401).json({
        message: "Notification is not created ",
        success: false,
      });
    }

    const user = await User.findById(Created.receiver);
    if (!user) {
      return res.status(404).json({
        message: "Can not user with this id ",
        success: false,
      });
    }
    user.notication.push(Created._id);
    await user.save();
    return res.status(201).json({
      message: "Notification is created ",
      notification: Created,
      success: false,
    });
  } catch (error) {
    console.log("notification error", error);
    return res.status(501).json({
      message: "Internal server error",
      success: false,
    });
  }
};
