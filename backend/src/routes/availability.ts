import { Router, Request, Response } from "express";
import { setAvailability } from "../controllers/availabilityController";
import prisma from "../utils/prismaClient";

const router = Router();

router.post("/setup", (req: Request, res: Response) => setAvailability(req, res, prisma) as any);

export default router;