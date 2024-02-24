import { Schema, model } from "mongoose";
const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    commented_by: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    commented_on: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "blog",
    },
  },
  { timestamps: true }
);

const commentModel = model("comment", commentSchema);
export default commentModel;
