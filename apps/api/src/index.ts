import dotenv from "dotenv";
dotenv.config({
  path: "../../.env",
});

import app from "./app";
import { dbConnection } from "@repo/db";
const port = process.env.PORT;
dbConnection().then((response) => {
  console.log(response);
  if (response === 1) {
    app.listen(port, () => {
      console.log("Server and db started, port ", port);
    });
  }
});
