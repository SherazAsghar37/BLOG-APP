import { NextFunction, Request, Response } from "express";
import { inject, singleton } from "tsyringe";
import { ErrorHandler } from "../exceptions/error_handler";
import BlogService from "../services/blog_service";
import CommentSerivce from "../services/comment_service";

@singleton()
export default class BlogController {
  private readonly _customError = new ErrorHandler();
  constructor(
    @inject(BlogService)
    private readonly _blogService: BlogService,
    @inject(CommentSerivce)
    private readonly _commentSerivce: CommentSerivce
  ) {}

  public postBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, content } = req.body;
      const cover_url = `/images/uploads/${req.file?.filename}`;
      const author = res.locals.user._id;
      const message = await this._blogService.postBlog({
        title,
        content,
        cover_url,
        author,
      });
      res.locals.message = message;
      return res.redirect("/home");
    } catch (error) {
      this._customError.handleErrorWeb(req, res, error, "/signup");
    }
  };
  public getAllBlogs = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const blogs = await this._blogService.loadAllBlogs();
      res.locals.blogs = blogs;
      return next();
    } catch (error) {
      this._customError.handleErrorWeb(req, res, error, "/home");
    }
  };

  public getBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const blog = await this._blogService.loadBlog(id);
      res.locals.blog = blog;
      return next();
    } catch (error) {
      this._customError.handleErrorWeb(req, res, error, "/home");
    }
  };
  public comment = async (req: Request, res: Response, next: NextFunction) => {
    const { content } = req.body;
    const commented_by = res.locals.user._id;
    const commented_on = req.params.blogId;
    try {
      const newComment = await this._commentSerivce.postComment({
        content,
        commented_by,
        commented_on,
      });
      console.log(newComment);
      await this._blogService.addComment(commented_on, newComment);
      return res.redirect(`/blog/${commented_on}`);
    } catch (error) {
      this._customError.handleErrorWeb(
        req,
        res,
        error,
        `/blog/${commented_on}`
      );
    }
  };
}
