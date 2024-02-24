"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThrowCriticalError = void 0;
const HttpStatusCode_1 = __importDefault(require("../utils/HttpStatusCode"));
const custom_error_1 = require("./custom_error");
class ThrowCriticalError extends Error {
    constructor(error) {
        super();
        throw new custom_error_1.CustomError((error === null || error === void 0 ? void 0 : error.message) || "Internal Server Error", (error === null || error === void 0 ? void 0 : error.httpCode) || HttpStatusCode_1.default.INTERNAL_SERVER_ERROR);
    }
}
exports.ThrowCriticalError = ThrowCriticalError;
