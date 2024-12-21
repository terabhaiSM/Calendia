import { Router } from "express";
import { searchAvailableSlots } from "../controllers/slotsController";

const router = Router();

router.post("/search", searchAvailableSlots as any);

export default router;