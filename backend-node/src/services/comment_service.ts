import { singleton, inject } from "tsyringe";
import CommentRepository from "../repositories/comment_repository";
import { CustomError } from "../exceptions/custom_error";
import { ThrowCriticalError } from "../exceptions/critical_error";
import { Comment } from "../@types/comment";

@singleton()
export default class CommentSerivce {
  constructor(
    @inject(CommentRepository)
    private readonly _commentRepository: CommentRepository
  ) {}
  public postComment = async (comment: Comment): Promise<Comment> => {
    try {
      return await this._commentRepository.createComment(comment);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw new ThrowCriticalError(error);
      }
    }
  };
}
