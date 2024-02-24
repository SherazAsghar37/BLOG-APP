"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const crypto_1 = require("crypto");
const userSchema = new mongoose_1.Schema({
    full_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
    },
    avatar: {
        type: String,
        default: "/images/male-user.jpg",
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    },
    gender: {
        type: String,
        enum: ["MALE", "FEMALE"],
        required: true,
    },
}, { timestamps: true });
userSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password"))
        return next();
    const salt = (0, crypto_1.randomBytes)(16).toString();
    const hashedPassword = (0, crypto_1.createHmac)("sha256", salt)
        .update(user.password)
        .digest("hex");
    this.salt = salt;
    this.password = hashedPassword;
    next();
});
const userModel = (0, mongoose_1.model)("user", userSchema);
exports.default = userModel;
