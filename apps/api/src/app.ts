import express from "express";
import userRouter from "./routes/user.routes";
import { animeRouter } from "./routes/anime.routes";

const app = express();

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/anime/animeCard", animeRouter);
export default app;
