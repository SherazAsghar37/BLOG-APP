import express from "express";
import BlogController from "../controllers/blog_controller";
import { container } from "tsyringe";

const staticRouter = express.Router();
const blogController = container.resolve(BlogController);

staticRouter.get("/home", blogController.getAllBlogs, (req, res) => {
  return res.render("home", {
    user: res.locals.user,
    error: res.locals.error,
    blogs: res.locals.blogs,
  });
});
staticRouter.get("/signup", (req, res) => {
  return res.render("signup", {
    error: res.locals.error,
  });
});

staticRouter.get("/login", (req, res) => {
  return res.render("login", {
    error: res.locals.error,
  });
});
staticRouter.get("/logout", (req, res) => {
  return res.clearCookie("token").redirect("/home");
});

staticRouter.get("/create-blog", (req, res) => {
  return res.render("createBlog", {
    error: res.locals.error,
  });
});

staticRouter.get("/blog/:id", blogController.getBlog, (req, res) => {
  // console.log(req.flash("msg"));
  return res.render("blog", {
    error: req.flash("msg"),
    user: res.locals.user,
    blog: res.locals.blog,
  });
});
export default staticRouter;
