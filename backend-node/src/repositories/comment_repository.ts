import { Comment } from "../@types/comment";
import commentModel from "../models/comment";
import { CustomError } from "../exceptions/custom_error";
import HttpStatusCode from "../utils/HttpStatusCode";
export default class CommentRepository {
  public createComment = async (data: Comment): Promise<Comment> => {
    try {
      console.log(data);
      const newComment = await commentModel.create({
        content: data.content as string,
        commented_by: data.commented_by,
        commented_on: data.commented_on,
      });

      if (newComment) {
        return newComment as Comment;
      } else {
        throw new CustomError(
          "Failed to create comment",
          HttpStatusCode.INTERNAL_SERVER_ERROR
        );
      }
    } catch (error) {
      throw new CustomError(`${error}`, HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
  };
}
