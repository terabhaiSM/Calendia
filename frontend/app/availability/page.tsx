"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeeklyCalendar } from "@/components/weekly-calendar";
import { AvailabilityList } from "@/components/availability-list";

export default function AvailabilityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Availability</h1>
        <p className="text-muted-foreground">
          Manage your weekly availability schedule.
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <WeeklyCalendar />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Availability Rules</CardTitle>
          </CardHeader>
          <CardContent>
            <AvailabilityList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}