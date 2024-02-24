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
const HttpStatusCode_1 = __importDefault(require("../utils/HttpStatusCode"));
const tsyringe_1 = require("tsyringe");
const user_service_1 = __importDefault(require("../services/user_service"));
const error_handler_1 = require("../exceptions/error_handler");
let AuthController = class AuthController {
    constructor(_userServices) {
        this._userServices = _userServices;
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const token = yield this._userServices.loginLocal(email, password);
                if (token) {
                    return res.cookie("token", token).redirect("/home");
                }
                else {
                    return res
                        .status(HttpStatusCode_1.default.UNAUTHORIZED)
                        .json({ message: "Authentication failed, worong password" });
                }
            }
            catch (error) {
                res.locals.error = error;
                new error_handler_1.ErrorHandler().handleErrorWeb(req, res, error, "/login");
            }
        });
        this.signUp = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, gender, full_name } = req.body;
                const token = yield this._userServices.signUpLocal(full_name, email, password, gender);
                return res.cookie("token", token).redirect("/home");
            }
            catch (error) {
                res.locals.error = error;
                new error_handler_1.ErrorHandler().handleErrorWeb(req, res, error, "/signup");
            }
        });
    }
};
AuthController = __decorate([
    (0, tsyringe_1.singleton)(),
    __param(0, (0, tsyringe_1.inject)(user_service_1.default)),
    __metadata("design:paramtypes", [user_service_1.default])
], AuthController);
exports.default = AuthController;
