"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const app_config_1 = __importDefault(require("./src/config/app.config"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const static_1 = __importDefault(require("./src/routes/static"));
const auth_1 = __importDefault(require("./src/routes/auth"));
const blog_1 = __importDefault(require("./src/routes/blog"));
dotenv_1.default.config();
const port = process.env.PORT || 8000;
const app = (0, app_config_1.default)();
mongoose_1.default
    .connect(process.env.DATABASE_URL)
    .then((e) => console.log("MongoDB Connected"))
    .catch((error) => {
    console.log("MonogDB connection error : ", error);
});
app.use("/api", auth_1.default);
app.use("/", static_1.default);
app.use("/api", blog_1.default);
app.get("/test", (req, res) => {
    return res.json("");
});
app.listen(port, () => {
    console.log(`server is listening on port: ${port}`);
});
