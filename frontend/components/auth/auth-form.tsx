"use client";

import { useState } from "react";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus, LogIn } from "lucide-react";
import { LoginForm } from "@/components/auth/login-form";
import { RegisterForm } from "@/components/auth/register-form";
import { OTPVerification } from "@/components/auth/otp-verification";
import { AuthLayout } from "@/components/auth/auth-layout";
import { toast } from "sonner";
import { API_BASE_URL } from "@/lib/config";

export function AuthForm() {
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const handleRegisterSuccess = (email: string) => {
    setRegisteredEmail(email);
    setShowOTPVerification(true);
  };

  const handleVerificationSuccess = () => {
    setShowOTPVerification(false);
  };

  const handleResendOTP = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/resend-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: registeredEmail }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to resend OTP");
      }
      // Show success message to user
      toast.success("OTP resent successfully");
    } catch (error) {
      console.error("Failed to resend OTP:", error);
      // Show error message to user
      toast.error("Failed to resend OTP");
    }
  };

  if (showOTPVerification) {
    return (
      <AuthLayout>
        <CardContent className="p-6">
          <OTPVerification
            email={registeredEmail}
            onVerificationSuccess={handleVerificationSuccess}
            onResendOTP={handleResendOTP}
          />
        </CardContent>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-14 rounded-b-none">
          <TabsTrigger value="login" className="flex items-center gap-2 text-sm sm:text-base">
            <LogIn className="h-4 w-4 hidden sm:inline" />
            Login
          </TabsTrigger>
          <TabsTrigger value="register" className="flex items-center gap-2 text-sm sm:text-base">
            <UserPlus className="h-4 w-4 hidden sm:inline" />
            Register
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <CardHeader className="space-y-2 px-4 sm:px-6">
            <CardTitle className="text-2xl sm:text-3xl font-bold">Welcome back</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-6">
            <LoginForm onUnverifiedEmail={handleRegisterSuccess} />
          </CardContent>
        </TabsContent>

        <TabsContent value="register">
          <CardHeader className="space-y-2 px-4 sm:px-6">
            <CardTitle className="text-2xl sm:text-3xl font-bold">Create an account</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Enter your details to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-6">
            <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
          </CardContent>
        </TabsContent>
      </Tabs>
    </AuthLayout>
  );
}