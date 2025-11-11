import express from "express";
import cors from "cors";
import { mylogger } from "./middleware/logger";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Custom middleware to log HTTP requests
app.use(mylogger);
app.use(cors());
app.use(express.json());

app.post("/webhook/:userId/:zapId", (req, res) => {
  console.log("body::", req.params);
  res.status(200).json({ msg: "webhook created!" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
