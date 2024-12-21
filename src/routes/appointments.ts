import { Router } from "express";
import { bookAppointment } from "../controllers/appointmentsController";

const router = Router();

router.post("/book", bookAppointment as any);

export default router;