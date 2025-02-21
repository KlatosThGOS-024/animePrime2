import Router from "express";
import { saveAmimeCard } from "../controllers/AnimeData/animedata.controller";

const animeRouter = Router();

animeRouter.route("/anime/animeCard").post(saveAmimeCard);

export { animeRouter };
