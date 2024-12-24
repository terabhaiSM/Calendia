"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function Home() {
  const router = useRouter();
  const { token, isInitialized } = useAuth();

  useEffect(() => {
    if (isInitialized && !token) {
      router.replace("/auth");
    }
  }, [token, isInitialized, router]);

  if (!isInitialized || !token) {
    return null;
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
      {/* Add your protected content here */}
    </div>
  );
}