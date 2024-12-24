"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { AvailabilityView } from "@/components/dashboard/availability-view";

export default function DashboardPage() {
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
    <DashboardLayout>
      <AvailabilityView />
    </DashboardLayout>
  );
}