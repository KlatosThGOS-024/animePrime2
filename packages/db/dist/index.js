"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = exports.User = exports.AnimeCard = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AnimeCard_model_1 = __importDefault(require("./models/AnimeCard.model"));
exports.AnimeCard = AnimeCard_model_1.default;
const User_model_1 = require("./models/User.model");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return User_model_1.User; } });
const dbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const databaseUrl = "mongodb+srv://new:xP0U3KZJQM7yFqAl@cluster0.une21tv.mongodb.net/";
        const connection = yield mongoose_1.default.connect(databaseUrl);
        console.log("dssgsgjiodfgiosdghiosdhgoidgoisdhgiusdghksdhsd", databaseUrl);
        console.log("✅ MongoDB Connected:", connection.connection.host);
        return connection.connection.readyState;
    }
    catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        return null;
    }
});
exports.dbConnection = dbConnection;
