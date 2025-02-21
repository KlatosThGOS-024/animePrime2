"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: "../../.env",
});
const app_1 = __importDefault(require("./app"));
const port = process.env.PORT;
// app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
//   const statusCode = err.statusCode || 500;
//   const response = ApiResponse.failure(err.message, err.details);
//   res.status(statusCode).json(response);
// });
app_1.default.listen(port, () => {
    console.log("Server has started on port ", port);
});
