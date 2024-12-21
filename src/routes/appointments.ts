import { Router } from "express";
import { bookAppointment, listUpcomingAppointments } from "../controllers/appointmentsController";

const router = Router();

router.post("/book", bookAppointment as any);
router.get("/upcoming", listUpcomingAppointments as any);

export default router;