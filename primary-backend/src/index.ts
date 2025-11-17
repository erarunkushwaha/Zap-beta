import express from "express";
import { userRouter } from "./router/userRouter";
import { zapRouter } from "./router/zapRouter";

const app = express();

app.use("/api/v1/user", userRouter);
app.use("/api/v1/zap", zapRouter);

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
