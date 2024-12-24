"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Timer } from "lucide-react";
import { otpSchema } from "@/lib/validations/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { OTPInput } from "@/components/auth/otp-input";

type OTPFormValues = z.infer<typeof otpSchema>;

interface OTPVerificationProps {
  email: string;
  onVerificationSuccess: () => void;
  onResendOTP: () => Promise<void>;
}

export function OTPVerification({ email, onVerificationSuccess, onResendOTP }: OTPVerificationProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(180);
  const [canResend, setCanResend] = useState(false);

  const form = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0 && !canResend) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [resendTimer, canResend]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleResendOTP = async () => {
    if (!canResend) return;
    setIsLoading(true);
    try {
      await onResendOTP();
      setResendTimer(180);
      setCanResend(false);
    } catch (error) {
      console.error("Failed to resend OTP:", error);
    }
    setIsLoading(false);
  };

  const onSubmit = async (data: OTPFormValues) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onVerificationSuccess();
    } catch (error) {
      console.error("OTP verification failed:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <Mail className="w-12 h-12 mx-auto text-muted-foreground" />
        <h1 className="text-2xl font-semibold tracking-tight">Check your email</h1>
        <p className="text-sm text-muted-foreground">
          We sent a verification code to <span className="font-medium text-foreground">{email}</span>
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="otp" className="sr-only">
                  One-Time Password
                </Label>
                <FormControl>
                  <OTPInput
                    value={field.value}
                    onChange={field.onChange}
                    maxLength={6}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <Button
              type="submit"
              className="w-full h-12"
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Verify Email"}
            </Button>

            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Didn't receive the code?
              </p>
              {!canResend ? (
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Timer className="w-4 h-4" />
                  <span>Resend available in {formatTime(resendTimer)}</span>
                </div>
              ) : (
                <Button
                  type="button"
                  variant="link"
                  className="text-sm"
                  disabled={isLoading || !canResend}
                  onClick={handleResendOTP}
                >
                  Resend verification code
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}