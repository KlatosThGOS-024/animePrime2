import Router from "express";
import { saveAnimeCard } from "../controllers/animedata.controller";

const animeRouter = Router();

animeRouter.route("/anime/animeCard").post(saveAnimeCard);

export { animeRouter };
