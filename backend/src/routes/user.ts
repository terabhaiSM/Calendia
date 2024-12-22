import { Router, Request, Response } from "express";
import { registerUser } from "../controllers/userController";
import prisma from "../utils/prismaClient";

const router = Router();

router.post("/register", (req: Request, res: Response) => registerUser(req, res, prisma));

export default router;