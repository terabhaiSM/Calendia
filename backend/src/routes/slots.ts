import { Router, Request, Response } from "express";
import { searchAvailableSlots } from "../controllers/slotsController";
import prisma from "../utils/prismaClient";

const router = Router();

router.post("/search", (req: Request, res: Response) => searchAvailableSlots(req, res, prisma) as any);

export default router;