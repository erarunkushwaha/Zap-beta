import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import prisma from "../../db/prisma";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const router = Router();

router.post("/signup", async (req: Request, res: Response) => {
  // validate request body with zod
  const { email, password, name } = req.body;

  // create a user signup system

  // hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  // check for existing user
  // @ts-ignore
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }
  // create a user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });
  // generate a token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET ?? "");
  // return the user
  res.status(201).json({ token, msg: "User created successfully" });
});

router.post("/login", (req: Request, res: Response) => {
  console.log("login");
});

router.get("/user", (req: Request, res: Response) => {
  console.log("user");
});

export const userRouter = router;
