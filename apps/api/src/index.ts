import dotenv from "dotenv";
dotenv.config({
  path: "../../.env",
});

import app from "./app";
const port = process.env.PORT;

// app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
//   const statusCode = err.statusCode || 500;
//   const response = ApiResponse.failure(err.message, err.details);
//   res.status(statusCode).json(response);
// });

app.listen(port, () => {
  console.log("Server has started on port ", port);
});
