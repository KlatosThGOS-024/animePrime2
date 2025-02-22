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
const db_1 = require("@repo/db");
const port = process.env.PORT;
(0, db_1.dbConnection)().then((response) => {
    console.log(response);
    if (response === 1) {
        app_1.default.listen(port, () => {
            console.log("Server and db started, port ", port);
        });
    }
});
