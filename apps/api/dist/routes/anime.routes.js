"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.animeRouter = void 0;
const express_1 = __importDefault(require("express"));
const animedata_controller_1 = require("../controllers/animedata.controller");
const animeRouter = (0, express_1.default)();
exports.animeRouter = animeRouter;
animeRouter.route("/animeCard/save").post(animedata_controller_1.saveAnimeCard);
animeRouter.route("/animeCard/get").get(animedata_controller_1.getAnimeCard);
