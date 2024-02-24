import express from "express";
import { container } from "tsyringe";
import Validation from "../middlewares/validation";
import MulterConfig from "../config/multer";
import BlogController from "../controllers/blog_controller";

const blogRouter = express.Router();
const validation = container.resolve(Validation);
const multerConfig = container.resolve(MulterConfig);
const blogController = container.resolve(BlogController);

blogRouter
  .route("/create-blog")
  .post(
    multerConfig.blogCoverMulterUpload().single("cover_url"),
    validation.blogValidator,
    blogController.postBlog
  );
blogRouter.route("/blog/comment/:blogId").post(blogController.comment);
//   blogRouter
//   .route("/login")
//   .post(validation.userLoginValidator, authController.login);
export default blogRouter;
