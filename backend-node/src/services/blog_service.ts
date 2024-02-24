import { singleton, inject } from "tsyringe";
import BlogRepository from "../repositories/blog_repository";
import { CustomError } from "../exceptions/custom_error";
import { ThrowCriticalError } from "../exceptions/critical_error";
import { Blog } from "../@types/blog";
import { Comment } from "../@types/comment";
@singleton()
export default class BlogService {
  constructor(
    @inject(BlogRepository)
    private readonly _blogRepository: BlogRepository
  ) {}
  public postBlog = async (blog: Blog): Promise<string> => {
    try {
      await this._blogRepository.createBlog(blog);
      return "Blog created Sucessfully";
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw new ThrowCriticalError(error);
      }
    }
  };
  public loadAllBlogs = async (): Promise<Blog[]> => {
    try {
      const blogs: Blog[] = await this._blogRepository.findAllBlogs();
      return blogs as Blog[];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw new ThrowCriticalError(error);
      }
    }
  };
  public loadBlog = async (id: string): Promise<Blog> => {
    try {
      const blog: Blog = await this._blogRepository.findById(id);
      return blog as Blog;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw new ThrowCriticalError(error);
      }
    }
  };
  public addComment = async (id: string, comment: Comment): Promise<Blog> => {
    try {
      const blog: Blog = await this._blogRepository.findByIdAndAddComment(
        id,
        comment
      );
      return blog as Blog;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw new ThrowCriticalError(error);
      }
    }
  };
}
