import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { validateLoginInputs, validateRegisterInputs } from "../utils/validation";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sendOtpEmail } from "../utils/emailService";
import { generateOtp } from "../utils/otpUtils";

dotenv.config();


// Helper to generate a unique username
const generateUniqueUsername = async (name: string, prisma: PrismaClient): Promise<string> => {
  let username = name.toLowerCase().replace(/\s+/g, '') + Math.floor(Math.random() * 10000);
  const existingUser = await prisma.calendarOwner.findUnique({ where: { username } });
  while (existingUser) {
    username = name.toLowerCase().replace(/\s+/g, '') + Math.floor(Math.random() * 10000);
  }
  return username;
};

export const registerUser = async (req: Request, res: Response, prisma: PrismaClient) => {
  const { name, email, password }: { name: string; email: string; password: string } = req.body;

  const validationErrors = validateRegisterInputs(name, email, password);
  if (validationErrors.length) {
    return res.status(400).json({ message: "Validation errors", errors: validationErrors });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const username = await generateUniqueUsername(name, prisma);
    const otp = generateOtp();
    const otpExpiresAt = new Date(new Date().getTime() + 3 * 60 * 1000); // 3 minutes validity
    const otpSentAt = new Date();

    const user = await prisma.calendarOwner.create({
      data: { name, email, password: hashedPassword, username, otp, otpExpiresAt, otpSentAt },
    });

    await sendOtpEmail(email, otp);

    res.status(201).json({ message: "User registered successfully. OTP sent to your email.", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user", error });
  }
};

export const login = async (req: Request, res: Response, prisma: PrismaClient) => {
  const { email, password }: { email: string; password: string } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const validationErrors = validateLoginInputs(email, password);
  if (validationErrors.length) {
    return res.status(400).json({ message: "Validation errors", errors: validationErrors });
  }

  try {
    // Find the user
    const user = await prisma.calendarOwner.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (!user.verified) {
      return res.status(401).json({ message: "Please verify your email to continue." });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password." });
    }
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    res.status(200).json({
      message: "Login successful",
      accessToken: token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Error logging in", error });
  }
};