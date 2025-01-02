import { addMinutes, isAfter, isBefore } from "date-fns";

export const generateOtp = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
};

export const canSendNewOtp = (otpSentAt: Date | null): boolean => {
  if (!otpSentAt) return true;
  return isBefore(new Date(), addMinutes(otpSentAt, 2)); // Allow OTP resend after 2 minutes
};

export const isOtpValid = (otp: string, otpExpiresAt: Date | null): boolean => {
  if (!otpExpiresAt) return false;
  return isAfter(otpExpiresAt, new Date());
};