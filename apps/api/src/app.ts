import express from "express";
import userRouter from "./routes/user.routes";
import { animeRouter } from "./routes/anime.routes";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/anime", animeRouter);
export default app;
