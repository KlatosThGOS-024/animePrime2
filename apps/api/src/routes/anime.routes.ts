import Router from "express";
import {
  saveAnimeCard,
  getAnimeCard,
  getAnimeData,
} from "../controllers/animedata.controller";

const animeRouter = Router();

animeRouter.route("/animeCard/save").post(saveAnimeCard);
animeRouter.route("/animeCard/get").get(getAnimeCard);
animeRouter.route("/anime/getData").get(getAnimeData);

export { animeRouter };
