import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  Title: {
    type: String,
    requireq: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    required: true,
  },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "taskquestions" }],
});
