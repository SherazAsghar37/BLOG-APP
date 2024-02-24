"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    cover_url: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
    },
    comments: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "comment",
        },
    ],
}, { timestamps: true });
const blogModel = (0, mongoose_1.model)("blog", blogSchema);
exports.default = blogModel;
