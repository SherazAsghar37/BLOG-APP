"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const zod_1 = require("zod");
const HttpStatusCode_1 = __importDefault(require("../utils/HttpStatusCode"));
let Validation = class Validation {
    constructor() {
        this.userSignUpValidator = (req, res, next) => {
            const userSchema = zod_1.z.object({
                full_name: zod_1.z.string(),
                email: zod_1.z.string().email(),
                password: zod_1.z.string().min(6),
                gender: zod_1.z.string(),
            });
            try {
                const user = req.body;
                userSchema.parse(user);
                return next();
            }
            catch (error) {
                if (error instanceof zod_1.ZodError)
                    return zodErrorHandler(error, res);
                return res
                    .status(HttpStatusCode_1.default.INTERNAL_SERVER_ERROR)
                    .json({ message: "some thing went wrong" });
            }
        };
        this.userLoginValidator = (req, res, next) => {
            const userSchema = zod_1.z.object({
                email: zod_1.z.string().email(),
                password: zod_1.z.string().min(6),
            });
            try {
                const user = req.body;
                userSchema.parse(user);
                return next();
            }
            catch (error) {
                if (error instanceof zod_1.ZodError)
                    return zodErrorHandler(error, res);
                return res
                    .status(HttpStatusCode_1.default.INTERNAL_SERVER_ERROR)
                    .json({ message: "some thing went wrong" });
            }
        };
        this.blogValidator = (req, res, next) => {
            const MAX_FILE_SIZE = 50000000;
            const ACCEPTED_IMAGE_TYPES = [
                "image/jpeg",
                "image/jpg",
                "image/png",
                "image/webp",
            ];
            const blogSchema = zod_1.z.object({
                title: zod_1.z.string(),
                content: zod_1.z.string(),
                cover_url: zod_1.z
                    .any()
                    .refine((files) => {
                    console.log(`your file size is  : ${files === null || files === void 0 ? void 0 : files.size}`);
                    return (files === null || files === void 0 ? void 0 : files.size) <= MAX_FILE_SIZE;
                }, `Max image size is 5MB.`)
                    .refine((files) => {
                    console.log(`your file type is  : ${files === null || files === void 0 ? void 0 : files.mimetype}`);
                    return ACCEPTED_IMAGE_TYPES.includes(files === null || files === void 0 ? void 0 : files.mimetype);
                }, `Only .jpg, .jpeg, .png and .webp formats are supported`),
            });
            try {
                const blog = req.body;
                blogSchema.parse({
                    title: blog.title,
                    content: blog.content,
                    cover_url: req.file,
                });
                return next();
            }
            catch (error) {
                if (error instanceof zod_1.ZodError)
                    return zodErrorHandler(error, res);
                return res
                    .status(HttpStatusCode_1.default.INTERNAL_SERVER_ERROR)
                    .json({ message: "some thing went wrong" });
            }
        };
    }
};
Validation = __decorate([
    (0, tsyringe_1.singleton)()
], Validation);
exports.default = Validation;
function zodErrorHandler(error, res) {
    const response = error.errors.map((err) => {
        return {
            field: err.path.join("."),
            message: err.message === "Request"
                ? `Field ${err.path.join(".")} is required`
                : err.message,
        };
    });
    return res.status(HttpStatusCode_1.default.FORBIDDEN).json({
        message: "validation failed",
        error: response,
    });
}
