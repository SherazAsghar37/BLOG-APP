"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blog_controller_1 = __importDefault(require("../controllers/blog_controller"));
const tsyringe_1 = require("tsyringe");
const staticRouter = express_1.default.Router();
const blogController = tsyringe_1.container.resolve(blog_controller_1.default);
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
    return res.render("blog", {
        error: req.flash("msg"),
        user: res.locals.user,
        blog: res.locals.blog,
    });
});
exports.default = staticRouter;
