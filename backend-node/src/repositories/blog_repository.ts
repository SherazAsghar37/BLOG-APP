import { Blog } from "../@types/blog";
import blogModel from "../models/blog";
import { CustomError } from "../exceptions/custom_error";
import HttpStatusCode from "../utils/HttpStatusCode";
import { Comment } from "../@types/comment";
export default class BlogRepository {
  public createBlog = async (data: Blog): Promise<Blog> => {
    try {
      const newBlog = await blogModel.create({
        title: data.title as string,
        content: data.content as string,
        cover_url: data.cover_url as string,
        author: data.author,
      });

      if (newBlog) {
        return newBlog as Blog;
      } else {
        throw new CustomError(
          "Failed to create blog",
          HttpStatusCode.INTERNAL_SERVER_ERROR
        );
      }
    } catch (error) {
      throw new CustomError(`${error}`, HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
  };

  public findAllBlogs = async (): Promise<Blog[]> => {
    try {
      const blogs = await blogModel
        .find({})
        .sort({ createdAt: "desc" })
        .populate("author");

      if (blogs) {
        return blogs as Blog[];
      } else {
        throw new CustomError("Unable to find blogs", HttpStatusCode.NOT_FOUND);
      }
    } catch (error) {
      throw new CustomError(
        `Error : ${error}`,
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  };
  public findById = async (id: string): Promise<Blog> => {
    try {
      const populateQuery = [
        { path: "author", select: ["full_name", "avatar"] },
        {
          path: "comments",
          select: ["commented_by", "content"],
          populate: { path: "commented_by", select: ["avatar", "full_name"] },
        },
      ];
      const blog = await blogModel
        .findById({ _id: id })
        .populate(populateQuery);

      if (blog) {
        return blog as Blog;
      } else {
        throw new CustomError(
          "Unable to find a blog",
          HttpStatusCode.NOT_FOUND
        );
      }
    } catch (error) {
      throw new CustomError(
        `Error : ${error}`,
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  };
  public findByIdAndAddComment = async (
    id: string,
    comment: Comment
  ): Promise<Blog> => {
    try {
      const blog = await blogModel.findOneAndUpdate(
        { _id: id },
        {
          $push: {
            comments: comment,
          },
        }
      );

      if (blog) {
        return blog as Blog;
      } else {
        throw new CustomError(
          "Unable to find a blog",
          HttpStatusCode.NOT_FOUND
        );
      }
    } catch (error) {
      throw new CustomError(
        `Error : ${error}`,
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  };
}
