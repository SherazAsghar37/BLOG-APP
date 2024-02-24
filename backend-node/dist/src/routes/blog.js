"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tsyringe_1 = require("tsyringe");
const validation_1 = __importDefault(require("../middlewares/validation"));
const multer_1 = __importDefault(require("../config/multer"));
const blog_controller_1 = __importDefault(require("../controllers/blog_controller"));
const blogRouter = express_1.default.Router();
const validation = tsyringe_1.container.resolve(validation_1.default);
const multerConfig = tsyringe_1.container.resolve(multer_1.default);
const blogController = tsyringe_1.container.resolve(blog_controller_1.default);
blogRouter
    .route("/create-blog")
    .post(multerConfig.blogCoverMulterUpload().single("cover_url"), validation.blogValidator, blogController.postBlog);
blogRouter.route("/blog/comment/:blogId").post(blogController.comment);
exports.default = blogRouter;
