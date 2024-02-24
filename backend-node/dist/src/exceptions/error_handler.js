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
exports.ErrorHandler = void 0;
const custom_error_1 = require("./custom_error");
const HttpStatusCode_1 = __importDefault(require("../utils/HttpStatusCode"));
class ErrorHandler {
    isTrustedError(error) {
        if (error instanceof custom_error_1.CustomError) {
            return true;
        }
        return false;
    }
    handleTrustedError(error, response) {
        response.status(error.httpCode).json({ message: error.message });
    }
    handleCriticalError(error, response) {
        if (response) {
            console.trace(error);
            response
                .status(HttpStatusCode_1.default.INTERNAL_SERVER_ERROR)
                .json({ message: "Internal server error" });
        }
        console.log("Application encountered a critical error");
    }
    handleTrustedErrorWeb(request, response, error, render) {
        return __awaiter(this, void 0, void 0, function* () {
            yield request.flash("msg", error.message);
            return response.redirect(render);
        });
    }
    handleCriticalErrorWeb(request, response, error, render) {
        if (response) {
            console.trace(error);
            request.flash("msg", error.toString());
            return response.redirect(render);
        }
        console.log("Application encountered a critical error");
    }
    handleError(error, response) {
        if (this.isTrustedError(error) && response) {
            this.handleTrustedError(error, response);
        }
        else {
            this.handleCriticalError(error, response);
        }
    }
    handleErrorWeb(request, response, error, render) {
        if (this.isTrustedError(error) && response) {
            this.handleTrustedErrorWeb(request, response, error, render);
        }
        else {
            this.handleCriticalErrorWeb(request, response, error, render);
        }
    }
}
exports.ErrorHandler = ErrorHandler;
