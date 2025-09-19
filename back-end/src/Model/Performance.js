import mongoose from "mongoose";

const PerformanceSchema = new mongoose.Schema(
  {
    totalQuestion: {
      type: Number,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    mentee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
  },
  { timestamps: true }
);

const Performance = mongoose.model("Performance", PerformanceSchema);
export default Performance;
