"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const tsyringe_1 = require("tsyringe");
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const express_session_1 = __importDefault(require("express-session"));
const connect_flash_1 = __importDefault(require("connect-flash"));
function appConfig() {
    const app = (0, express_1.default)();
    const authentication = tsyringe_1.container.resolve(authentication_1.default);
    app.use((0, express_session_1.default)({
        secret: "secretz",
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 6000 },
    }));
    app.use((0, connect_flash_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use((0, cookie_parser_1.default)());
    app.use(authentication.checkForWebAuth("token"));
    app.use(express_1.default.static(path_1.default.resolve(__dirname, "../public")));
    app.set("view engine", "ejs");
    app.set("views", path_1.default.resolve("./src/views"));
    return app;
}
exports.default = appConfig;
