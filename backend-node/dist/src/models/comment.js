"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    content: {
        type: String,
        required: true,
    },
    commented_by: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    commented_on: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "blog",
    },
}, { timestamps: true });
const commentModel = (0, mongoose_1.model)("comment", commentSchema);
exports.default = commentModel;
