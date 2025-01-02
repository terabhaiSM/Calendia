import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { canSendNewOtp, generateOtp, isOtpValid } from "../utils/otpUtils";
import { sendOtpEmail } from "../utils/emailService";
import jwt from "jsonwebtoken";

export const confirmOtp = async (req: Request, res: Response, prisma: PrismaClient) => {
  const { email, otp }: { email: string; otp: string } = req.body;

  try {
    const user = await prisma.calendarOwner.findUnique({ where: { email } });

    if (!user || !user.otp || !isOtpValid(user.otp, user.otpExpiresAt)) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Incorrect OTP." });
    }

    // OTP confirmed, clear OTP fields
    const updatedUser = await prisma.calendarOwner.update({
      where: { email },
      data: {  verified: true, otp: null, otpExpiresAt: null },
    });

    const token = jwt.sign(
        {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          username: updatedUser.username,
        },
        process.env.JWT_SECRET as string,
        { expiresIn: process.env.JWT_EXPIRATION }
      );

    res.status(200).json({ message: "OTP confirmed. User authenticated.", accessToken: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error confirming OTP", error });
  }
};

export const resendOtp = async (req: Request, res: Response, prisma: PrismaClient) => {
  const { email }: { email: string } = req.body;

  try {
    const user = await prisma.calendarOwner.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if user is already verified
    if (user.verified) {
      return res.status(400).json({ message: "Email is already verified." });
    }

    // Check if previous OTP was sent less than 3 minutes ago
    if (user.otpSentAt) {
      const timeSinceLastOtp = Date.now() - user.otpSentAt.getTime();
      const threeMinutesInMs = 3 * 60 * 1000;

      if (timeSinceLastOtp < threeMinutesInMs) {
        const remainingTime = Math.ceil((threeMinutesInMs - timeSinceLastOtp) / 1000);
        return res.status(429).json({
          message: "Please wait before requesting a new OTP",
          remainingTime, // Send remaining time in seconds
        });
      }
    }

    const otp = generateOtp();
    const otpExpiresAt = new Date(Date.now() + 3 * 60 * 1000);
    const otpSentAt = new Date();

    await prisma.calendarOwner.update({
      where: { email },
      data: { otp, otpExpiresAt, otpSentAt },
    });

    await sendOtpEmail(email, otp);

    res.status(200).json({ message: "OTP resent successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error resending OTP", error });
  }
};