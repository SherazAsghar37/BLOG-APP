"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blog_1 = __importDefault(require("../models/blog"));
const custom_error_1 = require("../exceptions/custom_error");
const HttpStatusCode_1 = __importDefault(require("../utils/HttpStatusCode"));
class BlogRepository {
    constructor() {
        this.createBlog = (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newBlog = yield blog_1.default.create({
                    title: data.title,
                    content: data.content,
                    cover_url: data.cover_url,
                    author: data.author,
                });
                if (newBlog) {
                    return newBlog;
                }
                else {
                    throw new custom_error_1.CustomError("Failed to create blog", HttpStatusCode_1.default.INTERNAL_SERVER_ERROR);
                }
            }
            catch (error) {
                throw new custom_error_1.CustomError(`${error}`, HttpStatusCode_1.default.INTERNAL_SERVER_ERROR);
            }
        });
        this.findAllBlogs = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const blogs = yield blog_1.default
                    .find({})
                    .sort({ createdAt: "desc" })
                    .populate("author");
                if (blogs) {
                    return blogs;
                }
                else {
                    throw new custom_error_1.CustomError("Unable to find blogs", HttpStatusCode_1.default.NOT_FOUND);
                }
            }
            catch (error) {
                throw new custom_error_1.CustomError(`Error : ${error}`, HttpStatusCode_1.default.INTERNAL_SERVER_ERROR);
            }
        });
        this.findById = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const populateQuery = [
                    { path: "author", select: ["full_name", "avatar"] },
                    {
                        path: "comments",
                        select: ["commented_by", "content"],
                        populate: { path: "commented_by", select: ["avatar", "full_name"] },
                    },
                ];
                const blog = yield blog_1.default
                    .findById({ _id: id })
                    .populate(populateQuery);
                if (blog) {
                    return blog;
                }
                else {
                    throw new custom_error_1.CustomError("Unable to find a blog", HttpStatusCode_1.default.NOT_FOUND);
                }
            }
            catch (error) {
                throw new custom_error_1.CustomError(`Error : ${error}`, HttpStatusCode_1.default.INTERNAL_SERVER_ERROR);
            }
        });
        this.findByIdAndAddComment = (id, comment) => __awaiter(this, void 0, void 0, function* () {
            try {
                const blog = yield blog_1.default.findOneAndUpdate({ _id: id }, {
                    $push: {
                        comments: comment,
                    },
                });
                if (blog) {
                    return blog;
                }
                else {
                    throw new custom_error_1.CustomError("Unable to find a blog", HttpStatusCode_1.default.NOT_FOUND);
                }
            }
            catch (error) {
                throw new custom_error_1.CustomError(`Error : ${error}`, HttpStatusCode_1.default.INTERNAL_SERVER_ERROR);
            }
        });
    }
}
exports.default = BlogRepository;
