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
const JWT_Utils_1 = __importDefault(require("../utils/JWT_Utils"));
let Authentication = class Authentication {
    constructor() {
        this.checkForWebAuth = (cookie) => {
            return (req, res, next) => {
                const token = req.cookies[cookie];
                if (!token) {
                    return next();
                }
                try {
                    const jwt = new JWT_Utils_1.default();
                    const user = jwt.verifyToken(token);
                    res.locals.user = user;
                }
                catch (error) { }
                return next();
            };
        };
    }
};
Authentication = __decorate([
    (0, tsyringe_1.singleton)()
], Authentication);
exports.default = Authentication;
