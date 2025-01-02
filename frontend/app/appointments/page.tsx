"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppointmentList } from "@/components/appointment-list";
import { AppointmentFilters } from "@/components/appointment-filters";

export default function AppointmentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
        <p className="text-muted-foreground">
          View and manage your scheduled appointments.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appointments</CardTitle>
          <AppointmentFilters />
        </CardHeader>
        <CardContent>
          <AppointmentList />
        </CardContent>
      </Card>
    </div>
  );
}