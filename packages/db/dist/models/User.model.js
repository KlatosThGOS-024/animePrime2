"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    coverImg: {
        type: String,
    },
    email: {
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Please enter a valid email address",
        ],
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
}, { timestamps: true });
const User = mongoose_1.default.model("User", userSchema);
exports.User = User;
