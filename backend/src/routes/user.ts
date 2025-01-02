import { Router, Request, Response } from "express";
import { login, registerUser } from "../controllers/userController";
import prisma from "../utils/prismaClient";
import { resendOtp, confirmOtp } from "../controllers/otpController";

const router = Router();

router.post("/register", (req: Request, res: Response) => registerUser(req, res, prisma) as any);
router.post("/login", (req: Request, res: Response) => login(req, res, prisma) as any);
router.post("/resend-otp", (req: Request, res: Response) => resendOtp(req, res, prisma) as any);
router.post("/verify-otp", (req: Request, res: Response) => confirmOtp(req, res, prisma) as any);

export default router;