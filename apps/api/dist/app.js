"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const anime_routes_1 = require("./routes/anime.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/v1/user", user_routes_1.default);
app.use("/api/v1/anime/animeCard", anime_routes_1.animeRouter);
exports.default = app;
