-- AlterTable
ALTER TABLE "CalendarOwner" ADD COLUMN     "otp" TEXT,
ADD COLUMN     "otpExpiresAt" TIMESTAMP(3),
ADD COLUMN     "otpSentAt" TIMESTAMP(3);
