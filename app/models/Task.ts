import { Schema, model } from "mongoose";
import { ITask } from "@app/types/task";

const TaskSchema = new Schema<ITask>(
  {
    text: {
      type: String,
      required: true,
      trim: true,
      minlength: [4, "Task must be at least 4 characters long"],
    },
    isComplete: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export const Task = model<ITask>("Task", TaskSchema);
