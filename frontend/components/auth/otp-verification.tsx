"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Timer } from "lucide-react";
import { otpSchema } from "@/lib/validations/auth";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { OTPInput } from "@/components/auth/otp-input";
import { API_BASE_URL } from "@/lib/config";
import { useOtpTimer } from '@/hooks/use-otp-timer';

type OTPFormValues = z.infer<typeof otpSchema>;

interface OTPVerificationProps {
  email: string;
  onVerificationSuccess: () => void;
}

export function OTPVerification({ email, onVerificationSuccess }: OTPVerificationProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { canResend, resendTimer, startTimer } = useOtpTimer(email);
  const { setAuthToken } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleResendOTP = async () => {
    if (!canResend) return;
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/resend-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          // Rate limit hit - start timer with remaining time
          startTimer(data.remainingTime);
        }
        toast({
          variant: "destructive",
          title: "Failed to resend OTP",
          description: data.message || "Please try again later",
          className: "shadow-lg",
        });
        throw new Error(data.message || "Failed to resend OTP");
      }

      startTimer(); // Start 3-minute timer
      toast({
        variant: "success",
        title: "Success",
        description: "OTP resent successfully",
        className: "shadow-lg",
      });
    } catch (error) {
      console.error("Failed to resend OTP:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: OTPFormValues) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp: data.otp }),
      });

      if (!response.ok) {
        const error = await response.json();
        toast({
          variant: "destructive",
          title: "Verification failed",
          description: error.message || "Invalid or expired OTP",
          className: "shadow-lg",
        });
        throw new Error(error.message || "OTP verification failed");
      }

      const { accessToken } = await response.json();
      setAuthToken(accessToken);
      toast({
        variant: "success",
        title: "Success",
        description: "Email verified successfully",
        className: "shadow-lg",
      });
      onVerificationSuccess();
      router.push("/");
    } catch (error) {
      console.error("OTP verification failed:", error);
    } finally {
      setIsLoading(false);
    }
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
                Didn&apos;t receive the code?
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