import express from "express";
import { userRouter } from "./router/userRouter";
import { zapRouter } from "./router/zapRouter";
import { mylogger } from "./middleware/logger";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(mylogger);
app.use(cors());
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/zap", zapRouter);

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
