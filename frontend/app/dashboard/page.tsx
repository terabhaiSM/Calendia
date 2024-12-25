"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Overview } from "@/components/dashboard/overview";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your calendar.
        </p>
      </div>

      <DashboardStats />

      <Card>
        <CardHeader>
          <CardTitle>Weekly Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <Overview />
        </CardContent>
      </Card>
    </div>
  );
}