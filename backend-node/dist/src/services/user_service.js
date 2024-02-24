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
const user_repository_1 = __importDefault(require("../repositories/user_repository"));
const custom_error_1 = require("../exceptions/custom_error");
const critical_error_1 = require("../exceptions/critical_error");
const HttpStatusCode_1 = __importDefault(require("../utils/HttpStatusCode"));
const hash_password_1 = __importDefault(require("../utils/hash_password"));
const JWT_Utils_1 = __importDefault(require("../utils/JWT_Utils"));
let UserService = class UserService {
    constructor(_userRepository) {
        this._userRepository = _userRepository;
        this.signUpLocal = (full_name, email, password, gender) => __awaiter(this, void 0, void 0, function* () {
            try {
                const salt = null;
                const user = yield this._userRepository.createByLocal({
                    salt,
                    full_name,
                    email,
                    password,
                    gender,
                });
                const jwt = new JWT_Utils_1.default();
                return jwt.generateUserToken(user);
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
        this.loginLocal = (email, password) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this._userRepository.findByEmail(email);
                const pass = new hash_password_1.default().deHash(password, user.salt);
                if (pass === user.password) {
                    const jwt = new JWT_Utils_1.default();
                    return jwt.generateUserToken(user);
                }
                else {
                    throw new custom_error_1.CustomError("Authentication failed, wrong password", HttpStatusCode_1.default.UNAUTHORIZED);
                }
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
UserService = __decorate([
    (0, tsyringe_1.singleton)(),
    __param(0, (0, tsyringe_1.inject)(user_repository_1.default)),
    __metadata("design:paramtypes", [user_repository_1.default])
], UserService);
exports.default = UserService;
