import Router from "express";
import { saveAmimeCard } from "../controllers/AnimeData/animedata.controller";

const animeRouter = Router();

animeRouter.route("/animeCard").post(saveAmimeCard);

export { animeRouter };
