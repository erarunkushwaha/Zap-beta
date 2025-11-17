import { Request, Response, Router } from "express";

const router = Router();

router.get("/zap", (req: Request, res: Response) => {
  console.log("zap");
});

export const zapRouter = router;
