import { Mongoose } from "mongoose";

type Blog = {
  title: string;
  content: string;
  cover_url: string;
  author: Mongoose.Schema.Type.ObjectId;
};

export { Blog };
