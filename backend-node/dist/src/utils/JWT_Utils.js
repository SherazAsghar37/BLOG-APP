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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const custom_error_1 = require("../exceptions/custom_error");
const HttpStatusCode_1 = __importDefault(require("./HttpStatusCode"));
const tsyringe_1 = require("tsyringe");
let JWT_Utils = class JWT_Utils {
    constructor() {
        this.Private_Key = "Something Just Like This";
        this.generateToken = (data) => {
            return jsonwebtoken_1.default.sign(data, this.Private_Key, {
                algorithm: "HS256",
                expiresIn: "10d",
            });
        };
        this.generateUserToken = (user) => {
            return this.generateToken(JSON.parse(JSON.stringify(user)));
        };
        this.getUserFromRequest = (req) => {
            return this.verifyToken(this.extractToken(req));
        };
        this.extractToken = (req) => {
            const authorizationHeader = req.headers["authorization"];
            if (!authorizationHeader) {
                throw new custom_error_1.CustomError("User not Authenticated", HttpStatusCode_1.default.UNAUTHORIZED);
            }
            const token = authorizationHeader.replace("Bearer ", "");
            if (!token) {
                throw new custom_error_1.CustomError("Token not provided", HttpStatusCode_1.default.UNAUTHORIZED);
            }
            return token;
        };
        this.verifyToken = (token) => {
            try {
                return jsonwebtoken_1.default.verify(token, this.Private_Key);
            }
            catch (error) {
                if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
                    throw new custom_error_1.CustomError("Token is expired", HttpStatusCode_1.default.UNAUTHORIZED);
                }
                else if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                    throw new custom_error_1.CustomError("Invalid token", HttpStatusCode_1.default.UNAUTHORIZED);
                }
                else if (error instanceof jsonwebtoken_1.default.NotBeforeError) {
                    throw new custom_error_1.CustomError("Token not yet active", HttpStatusCode_1.default.UNAUTHORIZED);
                }
                else {
                    throw new custom_error_1.CustomError("Token verification error", HttpStatusCode_1.default.INTERNAL_SERVER_ERROR);
                }
            }
        };
    }
};
JWT_Utils = __decorate([
    (0, tsyringe_1.autoInjectable)()
], JWT_Utils);
exports.default = JWT_Utils;
