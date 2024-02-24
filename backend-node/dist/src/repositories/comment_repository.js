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
const comment_1 = __importDefault(require("../models/comment"));
const custom_error_1 = require("../exceptions/custom_error");
const HttpStatusCode_1 = __importDefault(require("../utils/HttpStatusCode"));
class CommentRepository {
    constructor() {
        this.createComment = (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(data);
                const newComment = yield comment_1.default.create({
                    content: data.content,
                    commented_by: data.commented_by,
                    commented_on: data.commented_on,
                });
                if (newComment) {
                    return newComment;
                }
                else {
                    throw new custom_error_1.CustomError("Failed to create comment", HttpStatusCode_1.default.INTERNAL_SERVER_ERROR);
                }
            }
            catch (error) {
                throw new custom_error_1.CustomError(`${error}`, HttpStatusCode_1.default.INTERNAL_SERVER_ERROR);
            }
        });
    }
}
exports.default = CommentRepository;
