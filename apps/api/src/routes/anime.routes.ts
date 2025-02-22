import Router from "express";
import {
  saveAnimeCard,
  getAnimeCard,
} from "../controllers/animedata.controller";

const animeRouter = Router();

animeRouter.route("/animeCard/save").post(saveAnimeCard);
animeRouter.route("/animeCard/get").get(getAnimeCard);

export { animeRouter };
