"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tsyringe_1 = require("tsyringe");
const validation_1 = __importDefault(require("../middlewares/validation"));
const auth_controller_1 = __importDefault(require("../controllers/auth_controller"));
const authRouter = express_1.default.Router();
const validation = tsyringe_1.container.resolve(validation_1.default);
const authController = tsyringe_1.container.resolve(auth_controller_1.default);
authRouter
    .route("/signup")
    .post(validation.userSignUpValidator, authController.signUp);
authRouter
    .route("/login")
    .post(validation.userLoginValidator, authController.login);
exports.default = authRouter;
