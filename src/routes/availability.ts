import { Router } from "express";
import { setAvailability } from "../controllers/availabilityController";

const router = Router();

router.post("/setup", setAvailability as any);

export default router;