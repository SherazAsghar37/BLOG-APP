import { Mongoose } from "mongoose";

type Comment = {
  content: string;
  commented_by: Mongoose.Schema.Type.ObjectId;
  commented_on: Mongoose.Schema.Type.ObjectId;
};

export { Comment };
