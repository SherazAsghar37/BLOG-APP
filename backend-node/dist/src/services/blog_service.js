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
const blog_repository_1 = __importDefault(require("../repositories/blog_repository"));
const custom_error_1 = require("../exceptions/custom_error");
const critical_error_1 = require("../exceptions/critical_error");
let BlogService = class BlogService {
    constructor(_blogRepository) {
        this._blogRepository = _blogRepository;
        this.postBlog = (blog) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._blogRepository.createBlog(blog);
                return "Blog created Sucessfully";
            }
            catch (error) {
                if (error instanceof custom_error_1.CustomError) {
                    throw error;
                }
                else {
                    throw new critical_error_1.ThrowCriticalError(error);
                }
            }
        });
        this.loadAllBlogs = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const blogs = yield this._blogRepository.findAllBlogs();
                return blogs;
            }
            catch (error) {
                if (error instanceof custom_error_1.CustomError) {
                    throw error;
                }
                else {
                    throw new critical_error_1.ThrowCriticalError(error);
                }
            }
        });
        this.loadBlog = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const blog = yield this._blogRepository.findById(id);
                return blog;
            }
            catch (error) {
                if (error instanceof custom_error_1.CustomError) {
                    throw error;
                }
                else {
                    throw new critical_error_1.ThrowCriticalError(error);
                }
            }
        });
        this.addComment = (id, comment) => __awaiter(this, void 0, void 0, function* () {
            try {
                const blog = yield this._blogRepository.findByIdAndAddComment(id, comment);
                return blog;
            }
            catch (error) {
                if (error instanceof custom_error_1.CustomError) {
                    throw error;
                }
                else {
                    throw new critical_error_1.ThrowCriticalError(error);
                }
            }
        });
    }
};
BlogService = __decorate([
    (0, tsyringe_1.singleton)(),
    __param(0, (0, tsyringe_1.inject)(blog_repository_1.default)),
    __metadata("design:paramtypes", [blog_repository_1.default])
], BlogService);
exports.default = BlogService;
