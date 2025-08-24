import message from "../Model/Message.js";

export const SendMessageRepo = async (data) => {
  try {
    const created = await message.create(data);
    return created;
  } catch (error) {
    throw error;
  }
};

export const DeletedMessageRepo = async (id) => {
  try {
    const Deleted = await message.findByIdAndDelete(id);
    return Deleted;
  } catch (error) {
    throw error;
  }
};

export const EditMessage = async (id, text) => {
  try {
    const updated = await message.findByIdAndUpdate(
      id,
      { text },
      { new: true, runValidators: true } // Optional but recommended
    );

    if (!updated) {
      throw new Error("Message not found");
    }

    return updated;
  } catch (error) {
    throw new Error(`Failed to edit message: ${error.message}`);
  }
};

export const GetAllMessageOfAConvoRepo = async (id) => {
  try {
    const res = await message.find({ conversation: id }).populate("sender");
    return res;
  } catch (error) {
    throw error;
  }
};
