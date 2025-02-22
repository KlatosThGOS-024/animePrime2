"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const animeCardSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        trim: true,
        index: true,
    },
    image: {
        type: String,
    },
    typez: {
        type: String,
        trim: true,
    },
    subDub: {
        type: String,
    },
    timeago: {
        type: String,
    },
}, { timestamps: true });
const AnimeCard = mongoose_1.default.model("AnimeCard", animeCardSchema);
exports.default = AnimeCard;
