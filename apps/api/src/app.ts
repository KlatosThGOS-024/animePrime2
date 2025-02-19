import express from "express";
import userRouter from "./routes/user.routes";
import aiRouter from "./routes/AI_Routes/kwaiPortrait.routes";

const app = express();

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/ai/model", aiRouter);
export default app;
