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
const user_1 = __importDefault(require("../models/user"));
const custom_error_1 = require("../exceptions/custom_error");
const HttpStatusCode_1 = __importDefault(require("../utils/HttpStatusCode"));
class UserRepository {
    constructor() {
        this.createByLocal = (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield user_1.default.create({
                    full_name: data.full_name,
                    email: data.email,
                    password: data.password,
                    gender: data.gender,
                    avatar: data.gender === "FEMALE"
                        ? "images/female-user.jpg"
                        : "images/male-user.jpg",
                });
                if (newUser) {
                    return newUser;
                }
                else {
                    throw new custom_error_1.CustomError("Failed to create user", HttpStatusCode_1.default.INTERNAL_SERVER_ERROR);
                }
            }
            catch (error) {
                throw new custom_error_1.CustomError(`${error}`, HttpStatusCode_1.default.INTERNAL_SERVER_ERROR);
            }
        });
        this.findByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield user_1.default.findOne({
                    email,
                });
                if (newUser) {
                    return newUser;
                }
                else {
                    throw new custom_error_1.CustomError("Unable to find user", HttpStatusCode_1.default.NOT_FOUND);
                }
            }
            catch (error) {
                throw new custom_error_1.CustomError(`Error : ${error}`, HttpStatusCode_1.default.INTERNAL_SERVER_ERROR);
            }
        });
    }
}
exports.default = UserRepository;
