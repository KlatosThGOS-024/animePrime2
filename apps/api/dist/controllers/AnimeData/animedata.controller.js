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
exports.saveAmimeCard = void 0;
const asyncHandler_1 = require("../../utils/asyncHandler");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ApiError_1 = require("../../utils/ApiError");
const db_1 = __importDefault(require("db"));
const ApiResponse_1 = require("../../utils/ApiResponse");
const getAnimeFromJSON = () => {
    try {
        const filePath = path_1.default.resolve(__dirname, "../../../../../Anime.json"); // Go up two levels to the project root
        let animeList = [];
        if (fs_1.default.existsSync(filePath)) {
            const fileContent = fs_1.default.readFileSync(filePath, "utf8");
            animeList = fileContent ? JSON.parse(fileContent) : [];
        }
        return animeList;
    }
    catch (error) {
        console.log("Error reading Anime.json:", error);
    }
};
const saveAmimeCard = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // animeList.map((anime: any) => ({
        //   title: anime.title,
        //   image: anime.image,
        //   timeago: anime.timeago,
        //   typez: anime.typez || null,
        //   subDub: anime.subDub,
        // })),
        //       const RecentReleasedAnimeInstance = new RecentReleased()
        const animeList = getAnimeFromJSON();
        console.log(animeList);
        const saveAnimeCard = yield db_1.default.animeCard.create({
            data: {
                title: "gbvvbv",
                image: "gbvvbv",
                timeago: "gbvvbv",
                typez: "gbvvbv",
                subDub: "gbvvbv",
            },
        });
        res.send(new ApiResponse_1.ApiResponse(true, "Successfully saved anime data", saveAnimeCard));
    }
    catch (error) {
        //@ts-ignore
        res.send(new ApiError_1.ApiError("Something went wrong", 400, error));
    }
}));
exports.saveAmimeCard = saveAmimeCard;
