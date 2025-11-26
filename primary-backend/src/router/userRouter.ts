import { Request, Response, Router } from "express";

const router = Router();

router.post("/signup", (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  console.log("signup");
});

router.post("/login", (req: Request, res: Response) => {
  console.log("login");
});

router.get("/user", (req: Request, res: Response) => {
  console.log("user");
});

export const userRouter = router;
