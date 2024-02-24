"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const tsyringe_1 = require("tsyringe");
const error_handler_1 = require("../exceptions/error_handler");
const blog_service_1 = __importDefault(require("../services/blog_service"));
const comment_service_1 = __importDefault(require("../services/comment_service"));
let BlogController = class BlogController {
    constructor(_blogService, _commentSerivce) {
        this._blogService = _blogService;
        this._commentSerivce = _commentSerivce;
        this._customError = new error_handler_1.ErrorHandler();
        this.postBlog = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { title, content } = req.body;
                const cover_url = `/images/uploads/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.filename}`;
                const author = res.locals.user._id;
                const message = yield this._blogService.postBlog({
                    title,
                    content,
                    cover_url,
                    author,
                });
                res.locals.message = message;
                return res.redirect("/home");
            }
            catch (error) {
                this._customError.handleErrorWeb(req, res, error, "/signup");
            }
        });
        this.getAllBlogs = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const blogs = yield this._blogService.loadAllBlogs();
                res.locals.blogs = blogs;
                return next();
            }
            catch (error) {
                this._customError.handleErrorWeb(req, res, error, "/home");
            }
        });
        this.getBlog = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const blog = yield this._blogService.loadBlog(id);
                res.locals.blog = blog;
                return next();
            }
            catch (error) {
                this._customError.handleErrorWeb(req, res, error, "/home");
            }
        });
        this.comment = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { content } = req.body;
            const commented_by = res.locals.user._id;
            const commented_on = req.params.blogId;
            try {
                const newComment = yield this._commentSerivce.postComment({
                    content,
                    commented_by,
                    commented_on,
                });
                console.log(newComment);
                yield this._blogService.addComment(commented_on, newComment);
                return res.redirect(`/blog/${commented_on}`);
            }
            catch (error) {
                this._customError.handleErrorWeb(req, res, error, `/blog/${commented_on}`);
            }
        });
    }
};
BlogController = __decorate([
    (0, tsyringe_1.singleton)(),
    __param(0, (0, tsyringe_1.inject)(blog_service_1.default)),
    __param(1, (0, tsyringe_1.inject)(comment_service_1.default)),
    __metadata("design:paramtypes", [blog_service_1.default,
        comment_service_1.default])
], BlogController);
exports.default = BlogController;
