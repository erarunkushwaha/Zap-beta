import express from "express";
import cors from "cors";
import { mylogger } from "./middleware/logger";
import { Prisma, PrismaClient } from '@prisma/client'

import dotenv from "dotenv";
dotenv.config();

const app = express();



const prisma = new PrismaClient()

// Custom middleware to log HTTP requests
app.use(mylogger);
app.use(cors());
app.use(express.json());

app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
  const {userId, zapId} = req.params;
  const {body} = req.body

  // store in db a new trigger
  await prisma.$transaction( async (tx:Prisma.TransactionClient) => {

    const run = await tx.zapRun.create({
      data:{
        zapId:zapId,
        metaData:body
      }
    })
    await tx.zapRunOutbox.create({
      data:{
        zapRunid:run.id
      }
    });
  })

  res.status(200).json({ msg: "webhook received!" });
});

const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Server running on port ${port}`));
