"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { AuthForm } from "@/components/auth/auth-form";

export default function AuthPage() {
  const router = useRouter();
  const { token, isInitialized } = useAuth();

  useEffect(() => {
    if (isInitialized && token) {
      router.replace("/");
    }
  }, [token, isInitialized, router]);

  if (!isInitialized || token) {
    return null;
  }

  return <AuthForm />;
}