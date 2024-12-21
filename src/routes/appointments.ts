import { Router, Request, Response } from "express";
import { bookAppointment, listUpcomingAppointments } from "../controllers/appointmentsController";
import prisma from "../utils/prismaClient";

const router = Router();

router.post("/book", (req: Request, res: Response) => bookAppointment(req, res, prisma) as any);
router.get("/upcoming", (req: Request, res: Response) => listUpcomingAppointments(req, res, prisma) as any);

export default router;